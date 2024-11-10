from django.urls import path 
from . import views

urlpatterns = [
    path('api/login/',views.UserLoginView.as_view()),
    path('api/signup/',views.UserSignupView.as_view()),
    path('api/transaction/<int:pk>/',views.TransactionView.as_view()),
    path('api/transaction/create/',views.TransactionCreateView.as_view()),
    path('api/category/create/',views.CategoryCreateView.as_view()),
    path('api/category/list',views.CategoryListView.as_view()),
    path('api/categorytype/list/',views.CategoryTypeView.as_view()),
    path('api/profile/',views.ProfileView.as_view()),
    path('api/expenditure/',views.ExpenditureView.as_view()),
    path('api/transaction/list/',views.TransactionView.as_view()),
    path('api/transaction/delete/',views.TransactionDelete.as_view()),
]
    