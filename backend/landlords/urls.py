from django.urls import path
from .views import LandlordListView, LandlordView, TopSellerView

urlpatterns = [
    path('', LandlordListView.as_view()),
    path('topseller', TopSellerView.as_view()),
    path('<pk>', LandlordView.as_view()),
]