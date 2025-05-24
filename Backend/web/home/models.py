from django.db import models
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
import qrcode
import io
from django.dispatch import receiver
from django.db.models.signals import post_save

class Menu(models.Model):
    item = models.CharField(max_length=100)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    img = models.ImageField(upload_to='images/menu_items/')
    description = models.TextField()
    calories = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.item

class Event(models.Model):
    type = models.CharField(max_length=50)
    img = models.ImageField(upload_to='images/events/')
    bookings_available = models.IntegerField()
    bookings_left = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    qr_code = models.ImageField(upload_to='images/qrcodes/', blank=True, null=True)

    def __str__(self):
        return self.type

    def generate_qr_code(self):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        # Use the production URL for QR codes
        qr_url = f'https://coffee-cup-gamma.vercel.app/events/{self.id}/register'
        qr.add_data(qr_url)
        qr.make(fit=True)

        img = qr.make_image(fill='black', back_color='white')
        
        # Save the QR code to a BytesIO object
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_file = ContentFile(img_bytes.getvalue(), f'qr_code_{self.id}.png')
        
        # Save the QR code image to the model
        self.qr_code.save(f'qr_code_{self.id}.png', img_file, save=False)

    def save(self, *args, **kwargs):
        # Only generate QR code on creation
        if not self.pk:  # If this is a new instance
            super().save(*args, **kwargs)  # Save first to get ID
            self.generate_qr_code()
            super().save(*args, **kwargs)  # Save again with QR code
        else:
            super().save(*args, **kwargs)

# Use signals to generate QR code after saving
@receiver(post_save, sender=Event)
def create_qr_code(sender, instance, created, **kwargs):
    if created:
        instance.generate_qr_code()
        instance.save()

class EventSchedule(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    timing = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.event.type} on {self.timing}"

class EventRegistration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    registered_at = models.DateTimeField(auto_now_add=True)
    is_in_queue = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} registered for {self.event.type}"

    class Meta:
        unique_together = ('user', 'event')


class Table(models.Model):
    table_id = models.IntegerField(unique=True)

    def __str__(self):
        return f'Table {self.table_id}'

class TableBooking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)  # Link to the User model
    table = models.ForeignKey(Table, on_delete=models.CASCADE, null=True)
    timing = models.DateTimeField(null=True, blank=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return f'Booking for {self.table} at {self.timing} by {self.user}'


class Chef(models.Model):
    name = models.CharField(max_length=100)
    availability = models.CharField(max_length=50)
    cuisine = models.CharField(max_length=100)
    img = models.ImageField(upload_to='images/chefs/')

    def __str__(self):
        return self.name


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # To link reviews to users
    rating = models.IntegerField()  # Assuming a numeric rating system (1-5)
    comment = models.TextField()  # The actual review content
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for the review

    def __str__(self):
        return f'{self.user.username} - {self.rating}/5'

