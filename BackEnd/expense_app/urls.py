from django.urls import path 
from . import views

urlpatterns = [
    path('login/',views.UserLoginView.as_view()),
    path('',views.UserSignupView.as_view()),
    path('transaction/<int:pk>/',views.TransactionView.as_view()),
    path('transaction/create/',views.TransactionCreateView.as_view()),
    path('category/create/',views.CategoryCreateView.as_view()),
    path('category/list',views.CategoryListView.as_view()),
    path('categorytype/list/',views.CategoryTypeView.as_view()),
    path('profile/',views.ProfileView.as_view()),
    path('expenditure/',views.ExpenditureView.as_view()),
    path('transaction/list/',views.TransactionView.as_view()),
    path('transaction/delete/',views.TransactionDelete.as_view()),
]
    