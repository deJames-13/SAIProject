from django.urls import path
from .views import SignupView, LoginView, LogoutView, UserProfileView, UserUpdateProfileView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('update/', UserUpdateProfileView.as_view(), name='update'),
]
