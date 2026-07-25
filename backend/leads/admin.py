from django.contrib import admin
from .models import Lead

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'status', 'last_called_at', 'created_at')
    list_filter = ('status',)
    search_fields = ('name', 'phone', 'email')
