from rest_framework import serializers
from .models import Category,CategoryType,User,Transaction,Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User 
        fields=['username','email']


class CategoryTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=CategoryType 
        fields='__all__'

class CategorySerializer(serializers.ModelSerializer):
    category_type_name = serializers.SerializerMethodField()
    def get_category_type_name(self, obj):
        return obj.category_type.name
    class Meta:
        model=Category 
        fields=['id','name','category_type_name']

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    category_type_name = serializers.SerializerMethodField()

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

    def get_category_type_name(self, obj):
        return obj.category.category_type.name if obj.category else None

    class Meta:
        model = Transaction 
        fields = ['id','amount', 'category_name', 'date', 'category_type_name']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profile 
        fields='__all__'