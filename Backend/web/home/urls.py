"""
URL configuration for web project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from . import views

urlpatterns = [
    path('api/chatbot/', views.chatbot, name='chatbot'),
    path('api/cancel-registration/<int:event_id>/', views.cancel_registration, name='cancel_registration'),
    path('api/queue-position/<int:event_id>/', views.get_queue_position, name='queue_position'),
    path('api/reviews/', views.get_reviews, name='get_reviews'),
    path('api/user-registered-events/', views.user_registered_events, name='user_registered_events'),
    path('api/add-review/', views.add_review, name='add_review'),
    path('api/event-schedules/<int:event_id>/register/', views.register_for_event, name='register_for_event'),
    path('api/menus/', views.menu_list, name='menu_list'),
    path('api/events/', views.event_list, name='event_list'),
    path('api/event-schedules/', views.event_schedule_list, name='event_schedule_list'),
    path('api/chefs/', views.chef_list, name='chef_list'),
    path('api/table-bookings/', views.table_booking_list, name='table_booking_list'),
    path('api/book-table/', views.book_table, name='book_table'),
    path("api/register/", views.register, name='register'),
    path("api/home/", views.home, name='home'),
    path('api/create-order/', views.CreateOrderView.as_view(), name='create_order'),
    path('api/verify-payment/', views.VerifyPaymentView.as_view(), name='verify_payment'),
    path('api/create-bill/', views.create_bill, name='create_bill'),
    path('api/user-bills/', views.get_user_bills, name='user_bills'),
    path("api/login/", views.custom_login, name='custom_login'),
    path("api/logout/", views.custom_logout, name='custom_logout'),
    path("accounts/", include("django.contrib.auth.urls")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
