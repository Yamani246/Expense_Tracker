from django.db import models
from django.contrib.auth.models import User
from datetime import date

class CategoryType(models.Model):
    INCOME = 'income'
    EXPENSE = 'expense'

    CHOICES = [
        (INCOME, 'Income'),
        (EXPENSE, 'Expense'),
    ]
    name = models.CharField(max_length=7, choices=CHOICES)
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100,default=None)
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='category_user')
    category_type = models.ForeignKey(CategoryType, on_delete=models.CASCADE, related_name='categories')

    def __str__(self):
        return self.name
    
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount=models.IntegerField()
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name='category_tag')
    date = models.DateField(default=date.today)

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='owner')
    Balance=models.IntegerField(default=0)