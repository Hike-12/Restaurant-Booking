from django.contrib import admin
from home.models import Menu, Event, TableBooking, Chef,EventSchedule,Table,EventRegistration
# Register your models here.
admin.site.register(Menu)
admin.site.register(Event)
admin.site.register(EventSchedule)
admin.site.register(TableBooking)
admin.site.register(Chef)
admin.site.register(Table)
admin.site.register(EventRegistration)
#working