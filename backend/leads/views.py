from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Lead
from .serializers import LeadSerializer

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    @action(detail=True, methods=['post'])
    def mark_called(self, request, pk=None):
        """
        Frontend la Call button click pannumbodhu இது call pannanum.
        Actual call phone SIM la irundhu poidum (tel: link),
        இது backend la just 'last_called_at' timestamp + status update pannum.
        """
        lead = self.get_object()
        lead.last_called_at = timezone.now()
        if lead.status == 'new':
            lead.status = 'contacted'
        lead.save()
        serializer = self.get_serializer(lead)
        return Response(serializer.data)
