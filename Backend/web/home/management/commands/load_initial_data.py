from django.core.management.base import BaseCommand
from home.models import *
from django.contrib.auth.models import User
import os
from datetime import datetime
from django.utils import timezone

class Command(BaseCommand):
    help = 'Seed database with your exact development data and proper images'

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

        # Create exact menu items with PROPER FOOD IMAGES
        if not Menu.objects.exists():
            self.stdout.write('Creating menu items...')
            
            Menu.objects.create(
                item="Espresso",
                cost=350.00,
                img="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Rich, bold espresso shot - the heart of great coffee.",
                calories=5
            )
            
            Menu.objects.create(
                item="Cappuccino",
                cost=450.00,
                img="https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Espresso with steamed milk and thick, creamy foam.",
                calories=120
            )
            
            Menu.objects.create(
                item="Latte",
                cost=500.00,
                img="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Smooth espresso with perfectly steamed milk and latte art.",
                calories=150
            )
            
            Menu.objects.create(
                item="Americano",
                cost=400.00,
                img="https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Espresso with hot water for a smooth, clean coffee experience.",
                calories=10
            )
            
            Menu.objects.create(
                item="Mocha",
                cost=550.00,
                img="https://plus.unsplash.com/premium_photo-1668970851336-6c81cc888ba7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9jaGF8ZW58MHx8MHx8fDA%3D",
                description="Rich espresso with chocolate syrup and steamed milk.",
                calories=300
            )
            
            Menu.objects.create(
                item="Cold Brew",
                cost=475.00,
                img="https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Smooth, refreshing cold-steeped coffee served over ice.",
                calories=15
            )
            
            # COFFEE SHOP PASTRIES & SNACKS
            Menu.objects.create(
                item="Croissant",
                cost=325.00,
                img="https://plus.unsplash.com/premium_photo-1674562179816-04fda3958c12?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                description="Buttery, flaky French pastry - perfect with coffee.",
                calories=280
            )
            
            Menu.objects.create(
                item="Blueberry Muffin",
                cost=375.00,
                img="https://images.unsplash.com/photo-1607958996333-41aef7caefaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Fresh baked muffin bursting with juicy blueberries.",
                calories=320
            )
            
            Menu.objects.create(
                item="Grilled Chicken Salad",
                cost=900.00,
                img="https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Fresh greens with grilled chicken.",
                calories=350
            )
            
            Menu.objects.create(
                item="Margherita Pizza",
                cost=750.00,
                img="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Classic pizza with mozzarella and basil.",
                calories=800
            )
            
            Menu.objects.create(
                item="Chicken Burger",
                cost=1050.00,
                img="https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Juicy chicken patty with lettuce and tomato.",
                calories=950
            )
            
            Menu.objects.create(
                item="Veggie Wrap",
                cost=675.00,
                img="https://images.unsplash.com/photo-1630914441316-6d95bbd00caf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZ2llJTIwd3JhcHxlbnwwfHwwfHx8MA%3D%3D",
                description="Whole wheat wrap with mixed veggies.",
                calories=400
            )
            
            Menu.objects.create(
                item="Pasta Alfredo",
                cost=975.00,
                img="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
                description="Creamy Alfredo sauce over fettuccine",
                calories=900
            )
            
            Menu.objects.create(
                item="Lamb Kebabs",
                cost=1125.00,
                img="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Grilled lamb skewers with herbs.",
                calories=600
            )
            
            Menu.objects.create(
                item="Sushi Platter",
                cost=1350.00,
                img="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Assorted sushi rolls and nigiri.",
                calories=500
            )
            
            Menu.objects.create(
                item="Tomato Soup",
                cost=450.00,
                img="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Creamy tomato soup with basil.",
                calories=200
            )
            
            Menu.objects.create(
                item="Chocolate Brownie",
                cost=375.00,
                img="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Rich and fudgy chocolate brownie.",
                calories=450
            )
            
            Menu.objects.create(
                item="Avocado Toast",
                cost=600.00,
                img="https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description="Toast topped with mashed avocado and seasoning.",
                calories=300
            )

        # Create events with PROPER RESTAURANT EVENT IMAGES
        if not Event.objects.exists():
            self.stdout.write('Creating events...')
            
            Event.objects.create(
                type="Gourmet Tasting Menu Night",
                img="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=400&fit=crop&auto=format",
                bookings_available=20,
                bookings_left=5
            )
            
            Event.objects.create(
                type="Live Acoustic Music & Dinner",
                img="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop&auto=format",
                bookings_available=15,
                bookings_left=0
            )
            
            Event.objects.create(
                type="Chef's Table Experience",
                img="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&h=400&fit=crop&auto=format",
                bookings_available=10,
                bookings_left=5
            )

        # Create chefs with PROPER CHEF IMAGES (not shoes!)
        if not Chef.objects.exists():
            self.stdout.write('Creating chefs...')
            
            Chef.objects.create(
                name="Gordon Ramsay",
                availability="9 am to 5 pm",
                cuisine="English",
                img="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            )
            
            Chef.objects.create(
                name="Massimo Bottura",
                availability="10 am to 6 pm",
                cuisine="Italian",
                img="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoZWZ8ZW58MHx8MHx8fDA%3D"
            )
            
            Chef.objects.create(
                name="Nobu Matsuhisa",
                availability="11 am to 7 pm",
                cuisine="Japanese",
                img="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            )
            
            Chef.objects.create(
                name="Alain Ducasse",
                availability="8 am to 4 pm",
                cuisine="French",
                img="https://images.unsplash.com/photo-1574966740793-953ad374e8fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            )
            
            Chef.objects.create(
                name="Hélène Darroze",
                availability="12 pm to 8 pm",
                cuisine="French",
                img="https://plus.unsplash.com/premium_photo-1664475872802-c8b87eec84b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXRhbGlhbiUyMGNoZWZ8ZW58MHx8MHx8fDA%3D"
            )
            
            Chef.objects.create(
                name="Thomas Keller",
                availability="7 am to 3 pm",
                cuisine="American",
                img="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
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
            self.style.SUCCESS('Database seeded successfully with proper images!')
        )
        self.stdout.write('Data includes:')
        self.stdout.write(f'- {Menu.objects.count()} menu items with FOOD images')
        self.stdout.write(f'- {Event.objects.count()} events with RESTAURANT images')
        self.stdout.write(f'- {Chef.objects.count()} chefs with CHEF images')
        self.stdout.write(f'- {Table.objects.count()} tables')
        self.stdout.write(f'- {Review.objects.count()} reviews')
        self.stdout.write(f'- {User.objects.count()} users')