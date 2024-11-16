from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models  import User,Transaction,Category,CategoryType,Profile
from django.db.models import Q
from datetime import date
from .serializers import TransactionSerializer,CategorySerializer,CategoryTypeSerializer,ProfileSerializer,UserSerializer
from django.db.models import Sum

class UserLoginView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        username_or_email = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(Q(username=username_or_email) | Q(email=username_or_email)).first()
        if user and user.check_password(password):
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserSignupView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        username=request.data.get('username')
        password=request.data.get('password')
        email=request.data.get('email')
        user=User.objects.filter(username=username).first()
        if user:
            return Response({'error':'Username already exist'},status=status.HTTP_400_BAD_REQUEST)
        user=User.objects.filter(email=email).first()
        if user:
            return Response({'error':'Email is already registered'},status=status.HTTP_400_BAD_REQUEST)
        user=User.objects.create_user(username=username,email=email,password=password)
        Profile.objects.create(user=user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_202_ACCEPTED)
    

class TransactionView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    queryset=Transaction.objects.all()
    serializer_class=TransactionSerializer

class TransactionCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = TransactionSerializer

    def post(self, request):
        amount = request.data.get('amount')
        category_id = request.data.get('category')
        date = request.data.get('date')
        
        if not amount or not category_id or not date:
            return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            amount = int(amount)
        except ValueError:
            return Response({"error": "Invalid amount."}, status=status.HTTP_400_BAD_REQUEST)

        category = Category.objects.filter(id=category_id).first()
        if not category:
            return Response({"error": "Category not found."}, status=status.HTTP_400_BAD_REQUEST)

        category_type = category.category_type.name
        user = request.user

        try:
            account = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found for the user."}, status=status.HTTP_400_BAD_REQUEST)

        if category_type == 'expense':
            account.Balance -= amount
        else:
            account.Balance += amount

        account.save()

        transaction = Transaction.objects.create(
            user=user,
            category=category,
            amount=amount,
            date=date
        )

        return Response({"message": "Transaction added successfully"}, status=status.HTTP_201_CREATED)

class CategoryCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get('name')
        category_type= request.data.get('category_type') 
        user = request.user
        category = Category.objects.filter(name=name, user=user).first()
        if category:
            return Response({'error': f'Category "{name}" already exists'}, status=status.HTTP_400_BAD_REQUEST)
        category_type = CategoryType.objects.filter(id=category_type).first()
        new_category = Category.objects.create(name=name, user=user, category_type=category_type)
        serializer = CategorySerializer(new_category)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    

class CategoryListView(APIView):
    permission_classes=[AllowAny]
    def get(self,request):
        user=request.user
        category_type_name=request.query_params.get('category_type')
        if category_type_name!='':
            category_type=CategoryType.objects.get(name=category_type_name)
            data=Category.objects.filter(category_type=category_type,user=user)
        else:
            data=Category.objects.filter(user=user)
        serializer=CategorySerializer(data,many=True)
        return Response(serializer.data)

class CategoryTypeView(generics.ListCreateAPIView):
    permission_classes=[AllowAny]
    queryset=CategoryType.objects.all()
    serializer_class=CategoryTypeSerializer

class ProfileView(APIView):
    permission_classes=[AllowAny]
    def get(self,request):
        user=request.user
        profile=Profile.objects.filter(user=user).first()
        profile_serializer=ProfileSerializer(profile)
        user_serializer=UserSerializer(user)
        serializer={
            'profile':profile_serializer.data,
            'user':user_serializer.data
        }
        return Response(serializer)

class ExpenditureView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        user = request.user
        today = date.today()
        start_date = date(year=today.year, month=today.month, day=1)
        try:
            end_date = start_date.replace(day=31)
        except:
            if today.month==2:
                if (today.year%4==0 and today.year%100!=0) or today.year%400==0:
                    end_date=start_date.replace(day=29)
                else:
                    end_date=start_date.replace(day=28)
            else:
                end_date=start_date.replace(day=30)

        
        todays_transactions = Transaction.objects.filter(
            user=user,
            date=today
        )
        
        month_transactions = Transaction.objects.filter(
            user=user,
            date__gte=start_date,
            date__lte=end_date
        )
        
        today_expenditure = todays_transactions.filter(category__category_type__name='expense').aggregate(Sum('amount'))['amount__sum'] or 0
        today_income = todays_transactions.filter(category__category_type__name='income').aggregate(Sum('amount'))['amount__sum'] or 0
        
        month_expenditure = month_transactions.filter(category__category_type__name='expense').aggregate(Sum('amount'))['amount__sum'] or 0
        month_income = month_transactions.filter(category__category_type__name='income').aggregate(Sum('amount'))['amount__sum'] or 0
        
        return Response({
            'today_expenditure': today_expenditure,
            'today_income': today_income,
            'month_income': month_income,
            'month_expenditure': month_expenditure
        })
    
class TransactionView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        category = request.query_params.get('category')
        category_type = request.query_params.get('categoryType')
        date = request.query_params.get('date')
        user=request.user
        filter_conditions = Q(user=user)

        if category:
            filter_conditions &= Q(category__id=category)

        if category_type:
            filter_conditions &= Q(category__category_type__id=category_type)

        if date:
            filter_conditions &= Q(date=date)
        print(category,date,category_type)
        transactions = Transaction.objects.filter(filter_conditions)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    
class TransactionDelete(APIView):
    permission_classes = [AllowAny]
    def delete(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            transaction_id = request.data.get('itemId')
            category_type = request.data.get('categoryType')
            print(profile,transaction_id,category_type)
            transaction = Transaction.objects.filter(id=transaction_id).first()
            if not transaction:
                return Response(
                    {"error": "Transaction not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            if category_type == 'expense':
                profile.Balance += transaction.amount
            else:
                profile.Balance -= transaction.amount
            profile.save()
            transaction.delete()
            
            return Response(status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response(
                {"error": "Profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
