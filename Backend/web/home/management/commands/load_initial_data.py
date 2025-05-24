from django.core.management.base import BaseCommand
from home.models import *
from django.contrib.auth.models import User
import os
from datetime import datetime
from django.utils import timezone

class Command(BaseCommand):
    help = 'Seed database with your exact development data and placeholder images'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with your exact data...')
        
        # Create sample users (excluding superuser - that's handled separately)
        if not User.objects.filter(username='Aliqyaan').exists():
            self.stdout.write('Creating sample users...')
            
            User.objects.create_user(
                username='Aliqyaan',
                password='aliqyaan123'
            )
            
            User.objects.create_user(
                username='Romeiro',
                password='romeiro123'
            )
            
            User.objects.create_user(
                username='Gavin',
                password='gavin123'
            )

        # Create exact menu items from your database with placeholder images
        if not Menu.objects.exists():
            self.stdout.write('Creating menu items...')
            
            Menu.objects.create(
                item="Grilled Chicken Salad",
                cost=900.00,
                img="https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
                description="Fresh greens with grilled chicken.",
                calories=350
            )
            
            Menu.objects.create(
                item="Margherita Pizza",
                cost=750.00,
                img="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
                description="Classic pizza with mozzarella and basil.",
                calories=800
            )
            
            Menu.objects.create(
                item="Beef Burger",
                cost=1050.00,
                img="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
                description="Juicy beef patty with lettuce and tomato.",
                calories=950
            )
            
            Menu.objects.create(
                item="Veggie Wrap",
                cost=675.00,
                img="https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
                description="Whole wheat wrap with mixed veggies.",
                calories=400
            )
            
            Menu.objects.create(
                item="Pasta Alfredo",
                cost=975.00,
                img="https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
                description="Creamy Alfredo sauce over fettuccine",
                calories=900
            )
            
            Menu.objects.create(
                item="Lamb Kebabs",
                cost=1125.00,
                img="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop",
                description="Grilled lamb skewers with herbs.",
                calories=600
            )
            
            Menu.objects.create(
                item="Sushi Platter",
                cost=1350.00,
                img="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
                description="Assorted sushi rolls and nigiri.",
                calories=500
            )
            
            Menu.objects.create(
                item="Tomato Soup",
                cost=450.00,
                img="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop",
                description="Creamy tomato soup with basil.",
                calories=200
            )
            
            Menu.objects.create(
                item="Chocolate Brownie",
                cost=375.00,
                img="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
                description="Rich and fudgy chocolate brownie.",
                calories=450
            )
            
            Menu.objects.create(
                item="Avocado Toast",
                cost=600.00,
                img="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                description="Toast topped with mashed avocado and seasoning.",
                calories=300
            )

        # Create exact events from your database with placeholder images
        if not Event.objects.exists():
            self.stdout.write('Creating events...')
            
            Event.objects.create(
                type="Gourmet Tasting Menu Night",
                img="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
                bookings_available=20,
                bookings_left=5
            )
            
            Event.objects.create(
                type="Live Acoustic Music & Dinner",
                img="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
                bookings_available=15,
                bookings_left=0
            )
            
            Event.objects.create(
                type="Chef's Table Experience",
                img="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
                bookings_available=10,
                bookings_left=5
            )

        # Create exact chefs from your database with placeholder images
        if not Chef.objects.exists():
            self.stdout.write('Creating chefs...')
            
            Chef.objects.create(
                name="Gordon Ramsay",
                availability="9 am to 5 pm",
                cuisine="English",
                img="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop"
            )
            
            Chef.objects.create(
                name="Massimo Bottura",
                availability="10 am to 6 pm",
                cuisine="Italian",
                img="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"
            )
            
            Chef.objects.create(
                name="Nobu Matsuhisa",
                availability="11 am to 7 pm",
                cuisine="Japanese",
                img="https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop"
            )
            
            Chef.objects.create(
                name="Alain Ducasse",
                availability="8 am to 4 pm",
                cuisine="French",
                img="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop"
            )
            
            Chef.objects.create(
                name="Hélène Darroze",
                availability="12 pm to 8 pm",
                cuisine="French",
                img="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=400&fit=crop"
            )
            
            Chef.objects.create(
                name="Thomas Keller",
                availability="7 am to 3 pm",
                cuisine="American",
                img="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400&h=400&fit=crop"
            )

        # Create tables (1-15 as in your database)
        if not Table.objects.exists():
            self.stdout.write('Creating tables...')
            
            for table_num in range(1, 16):  # Tables 1-15
                Table.objects.create(table_id=table_num)

        # Create sample reviews from your database
        if not Review.objects.exists():
            self.stdout.write('Creating sample reviews...')
            
            # Get users to associate with reviews
            try:
                user1 = User.objects.get(username='Aliqyaan')
                user2 = User.objects.get(username='Romeiro')
                user3 = User.objects.get(username='Gavin')
                
                Review.objects.create(
                    user=user1,
                    rating=5,
                    comment="It was a wonderful Experience"
                )
                
                Review.objects.create(
                    user=user2,
                    rating=5,
                    comment="Great Ambience"
                )
                
                Review.objects.create(
                    user=user3,
                    rating=5,
                    comment="Amazing food and service!"
                )
                
                Review.objects.create(
                    user=user1,
                    rating=5,
                    comment="Had a Great Time"
                )
                
                Review.objects.create(
                    user=user2,
                    rating=5,
                    comment="Brilliant atmosphere and delicious food"
                )
                
                Review.objects.create(
                    user=user3,
                    rating=4,
                    comment="Excellent service and delicious food. Will definitely come back!"
                )
                
            except User.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING('Users not found for reviews. Skipping review creation.')
                )

        # Create event schedules
        if not EventSchedule.objects.exists():
            self.stdout.write('Creating event schedules...')
            
            events = Event.objects.all()
            for i, event in enumerate(events):
                # Create future dates for the events
                future_date = timezone.now() + timezone.timedelta(days=7 + i)
                EventSchedule.objects.create(
                    event=event,
                    timing=future_date
                )

        self.stdout.write(
            self.style.SUCCESS('Database seeded successfully with your exact data and images!')
        )
        self.stdout.write('Data includes:')
        self.stdout.write(f'- {Menu.objects.count()} menu items with food images')
        self.stdout.write(f'- {Event.objects.count()} events with event images')
        self.stdout.write(f'- {Chef.objects.count()} chefs with chef photos')
        self.stdout.write(f'- {Table.objects.count()} tables')
        self.stdout.write(f'- {Review.objects.count()} reviews')
        self.stdout.write(f'- {User.objects.count()} users')