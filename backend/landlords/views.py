from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Landlord
from .serializers import LandlordSerializer

class LandlordListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Landlord.objects.all()
    serializer_class = LandlordSerializer
    pagination_class = None

class LandlordView(RetrieveAPIView):
    queryset = Landlord.objects.all()
    serializer_class = LandlordSerializer

class TopSellerView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Landlord.objects.filter(top_seller=True)
    serializer_class = LandlordSerializer
    pagination_class = None
