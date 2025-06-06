from django.http import JsonResponse
from django.shortcuts import render
from .models import Menu, Event, EventSchedule, TableBooking, Chef, Table, EventRegistration,Review
import json
from datetime import datetime
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout,authenticate
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.views.decorators.http import require_http_methods
from django.contrib.sessions.models import Session
from django.views import View
from django.contrib.auth.models import User
import google.generativeai as genai
import os
from django.utils import timezone
from datetime import datetime
from django.utils import timezone
from dotenv import load_dotenv
from urllib.parse import quote

load_dotenv()

def get_bot_response(user_message):
    try:
        api_key = os.getenv("GOOGLE_API_KEY")  
        genai.configure(api_key=api_key)
        print(api_key)
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(user_message)
        if hasattr(response, 'text'):
            return response.text.strip()
        else:
            return 'Sorry, I didn’t understand that.'
    except Exception as e:
        print(f'Error: {e}')
        return 'Sorry, there was an error processing your request.'
    
    
@csrf_exempt
def chatbot(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Parse the JSON body
            user_message = data.get('message')

            if user_message:
                response = get_bot_response(user_message)
                return JsonResponse({'response': response})
            else:
                return JsonResponse({'error': 'No message provided'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# Add this helper function
def get_image_url(image_field):
    """
    Helper function to get the correct URL for an image field.
    Handles both external URLs and Django media files.
    """
    if not image_field:
        return ""
    
    # Convert to string first to handle both file paths and URLs
    img_str = str(image_field)
    
    # If it's already a full URL, return as-is
    if img_str.startswith('http://') or img_str.startswith('https://'):
        return img_str
    
    # If it's a local file path, try to get the URL
    try:
        return image_field.url if hasattr(image_field, 'url') else ""
    except:
        return ""
    
    
def menu_list(request):
    menus = Menu.objects.all()
    data = []
    for menu in menus:
        data.append({
            'item': menu.item,
            'cost': float(menu.cost),
            'img': get_image_url(menu.img),
            'description': menu.description, 
            'calories': menu.calories,
        })
    return JsonResponse(data, safe=False)

    
    
def event_list(request):
    events = Event.objects.all()
    data = []
    for event in events:
        # Handle external URLs for event images
        img_display = get_image_url(event.img)
        # Generate QR code URL dynamically using online service
        event_url = f"https://coffee-cup-gamma.vercel.app/event-schedules?eventId={event.id}"
        qr_code_url = f"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={quote(event_url)}"
        
        data.append({
            'id': event.id,
            'type': event.type,
            'img': img_display,
            'qr_code': qr_code_url,  # Dynamic QR code
            'bookings_available': event.bookings_available,
            'bookings_left': event.bookings_left,
        })
        
    return JsonResponse(data, safe=False)


def event_schedule_list(request):
    event_schedules = EventSchedule.objects.all()
    data = []
    for schedule in event_schedules:
        data.append({
            'id':schedule.event.id,
            'event': schedule.event.type,
            'date': schedule.timing.strftime('%Y-%m-%d'),  # Extract the date
            'time': schedule.timing.strftime('%H:%M'),  # Extract the time
            'bookings_available': schedule.event.bookings_available,
            'bookings_left': schedule.event.bookings_left,
            
        })
    return JsonResponse(data, safe=False)


# Update your chef_list function around line 98
def chef_list(request):
    chefs = Chef.objects.all()
    data = []
    for chef in chefs:
        data.append({
            'name': chef.name,
            'availability': chef.availability,
            'cuisine': chef.cuisine,
            'img': get_image_url(chef.img)
        })
    return JsonResponse(data, safe=False)


@csrf_exempt  # Disable CSRF for development purposes
def table_booking_list(request):
    print(f"Request method: {request.method}")
    print(f"User: {request.user.is_authenticated}")
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            date_str = data.get('date', None)
            time_str = data.get('time', None)

            if not date_str or not time_str:
                return JsonResponse({'message': 'Date and time are required'}, status=400)

            timing_str = f"{date_str} {time_str}:00"
            selected_datetime = datetime.strptime(timing_str, '%Y-%m-%d %H:%M:%S')

            booked_tables = TableBooking.objects.filter(timing=selected_datetime)

            tables = Table.objects.all()
            response_data = []
            for table in tables:
                is_booked = booked_tables.filter(table=table).exists()
                response_data.append({
                    'table_id': table.table_id,
                    'status': is_booked,
                    'timing': selected_datetime.strftime('%Y-%m-%d %H:%M:%S') if is_booked else None
                })
            
            return JsonResponse(response_data, safe=False)

        except ValueError:
            return JsonResponse({'message': 'Invalid date or time format'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON'}, status=400)

    return JsonResponse({'message': 'Invalid request method'}, status=405)

@csrf_exempt
def book_table(request):
    print(f"Request method: {request.method}")
    print(f"User authenticated: {request.user.is_authenticated}")
    print("Code reached here")
    print(f"User: {request.user}")
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(f"Received data: {data}")
            table_id = data.get('table_id')
            timing_str = data.get('timing')

            if timing_str:
                try:
                    # Parse the datetime and make it timezone-aware
                    naive_timing = datetime.strptime(timing_str, '%Y-%m-%d %H:%M:%S')
                    timing = timezone.make_aware(naive_timing)
                except ValueError as e:
                    print(f"Timing parsing error: {e}")
                    return JsonResponse({'message': 'Invalid timing format.'}, status=400)

                table = Table.objects.filter(table_id=table_id).first()
                if not table:
                    print(f"Table not found: {table_id}")
                    return JsonResponse({'message': 'Table does not exist.'}, status=404)

                if TableBooking.objects.filter(timing=timing, table=table, status=True).exists():
                    print(f"Table {table_id} already booked at {timing}")
                    return JsonResponse({'message': 'Table is already booked at this time.'}, status=400)

                try:
                    booking = TableBooking.objects.create(
                        user=request.user,
                        table=table,
                        timing=timing,
                        status=True
                    )
                    print(f"Booking created: {booking}")
                    return JsonResponse({
                        'message': 'Table booked successfully!',
                        'booking_id': booking.id,
                        'table_id': table.table_id,
                        'timing': timing.isoformat()
                    }, status=201)  # Changed to 201 for resource creation
                except Exception as e:
                    print(f"Error creating booking: {e}")
                    return JsonResponse({'message': 'Error creating booking.'}, status=500)

        except json.JSONDecodeError as e:
            print(f"JSON decode error: {e}")
            return JsonResponse({'message': 'Invalid JSON'}, status=400)
        except Exception as e:
            print(f"Unexpected error: {e}")
            return JsonResponse({'message': 'An unexpected error occurred.'}, status=500)

    print("Invalid request method")
    return JsonResponse({'message': 'Invalid request method.'}, status=405)

@csrf_exempt
@login_required
def register_for_event(request, event_id):
    if request.method == 'POST':
        user = request.user  # Assuming user is authenticated via session middleware or other methods

        # Fetch the event
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return JsonResponse({'error': 'Event does not exist'}, status=404)

        # Check how many users are registered for the event (excluding those in the queue)
        registrations_count = EventRegistration.objects.filter(event=event, is_in_queue=False).count()

        # Check if the user is already registered
        if EventRegistration.objects.filter(event=event, user=user).exists():
            return JsonResponse({'message': 'You are already registered for this event'}, status=400)

        if registrations_count < event.bookings_available and event.bookings_left-1>=0:
            # There is room, register the user directly
            EventRegistration.objects.create(user=user, event=event, is_in_queue=False)

            # Update bookings_left
            event.bookings_left = event.bookings_left - 1
            event.save()

            return JsonResponse({'message': 'Successfully registered for the event', 'bookings_left': event.bookings_left}, status=201)
        else:
            # The event is full, place the user in the queue
            EventRegistration.objects.create(user=user, event=event, is_in_queue=True)

            return JsonResponse({'message': 'Event is full. You have been placed in the queue'}, status=201)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt        
def cancel_registration(request, event_id):
    user = request.user
    event = Event.objects.get(id=event_id)

    try:
        # Check if the user is in the queue
        queue_registration = EventRegistration.objects.get(user=user, event=event, is_in_queue=True)
        queue_registration.delete()

        return JsonResponse({'message': 'You have been removed from the waitlist successfully.'}, status=200)

    except EventRegistration.DoesNotExist:
        # If the user is not in the queue, check if they are a regular participant
        try:
            registration = EventRegistration.objects.get(user=user, event=event, is_in_queue=False)
            registration.delete()
            
            # Check if there are people in the queue
            next_in_queue = EventRegistration.objects.filter(event=event, is_in_queue=True).order_by('registered_at').first()

            if next_in_queue:
                # Move them from the queue to registered
                next_in_queue.is_in_queue = False
                next_in_queue.save()
            else:
                event.bookings_left = event.bookings_left + 1
                event.save()

            return JsonResponse({'message': 'Event canceled and queue updated successfully.'}, status=200)

        except EventRegistration.DoesNotExist:
            return JsonResponse({'error': 'No registration found for this event.'}, status=404)

def get_queue_position(request, event_id):
    user = request.user
    event = Event.objects.get(id=event_id)

    try:
        registration = EventRegistration.objects.get(user=user, event=event, is_in_queue=True)
        # Count how many users registered before this user
        position_in_queue = EventRegistration.objects.filter(event=event, is_in_queue=True, registered_at__lt=registration.registered_at).count()

        return JsonResponse({'position_in_queue': position_in_queue}, status=200)
    
    except EventRegistration.DoesNotExist:
        return JsonResponse({'error': 'You are not in the queue for this event.'}, status=404)




def get_reviews(request):
    reviews = Review.objects.all().order_by('-created_at')
    reviews_data = [{
        'user': review.user.username,
        'rating': review.rating,
        'comment': review.comment,
        'created_at': review.created_at
    } for review in reviews]

    return JsonResponse(reviews_data, safe=False)

@csrf_exempt
def add_review(request):
    if request.method == 'POST':
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'You must be logged in to add a review'}, status=401)
        
        data = json.loads(request.body)
        user = request.user  # Use the authenticated user
        rating = data['rating']
        comment = data['comment']

        review = Review.objects.create(user=user, rating=rating, comment=comment)
        return JsonResponse({'status': 'Review added successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Update user_registered_events function around line 323
def user_registered_events(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User not authenticated'}, status=401)
    
    registrations = EventRegistration.objects.filter(user=request.user)
    events = []
    
    for reg in registrations:
        event_schedule = EventSchedule.objects.filter(event=reg.event).first()
        
        # Handle external URLs for event images
        img_url = reg.event.img.name if reg.event.img else ""
        if img_url.startswith('http://') or img_url.startswith('https://'):
            img_display = img_url
        else:
            img_display = reg.event.img.url if reg.event.img else ""
        
        event_data = {
            'id': reg.event.id,
            'event_type': reg.event.type,
            'event_img': img_display,
            'bookings_available': reg.event.bookings_available,
            'bookings_left': reg.event.bookings_left,
            'is_in_queue': reg.is_in_queue,
        }
        
        if event_schedule:
            event_data['event_date'] = event_schedule.timing
        
        events.append(event_data)

    return JsonResponse(events, safe=False)
    
    
    
# LOGIN
@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        form = UserCreationForm(data)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse({"success": True, "message": "User registered successfully"})
        else:
            print(form.errors)
            return JsonResponse({"success": False, "errors": form.errors}, status=400)
    else:
        return JsonResponse({"message": "Please use POST method for registration"}, status=405)
@csrf_exempt
@require_http_methods(["POST"])
def custom_login(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            print(f"User {user.username} logged in successfully.")
            print(f"Session key after login: {request.session.session_key}")
            print(f"Session data: {request.session.items()}")  # Log session data
            return JsonResponse({
                "success": True,
                "token": request.session.session_key,
                "message": "Logged in successfully",
                "sessionid": request.session.session_key,
                "username": user.username
            })
        else:
            print("Invalid credentials provided.")
            return JsonResponse({"success": False, "message": "Invalid credentials"}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({"success": False, "message": "Invalid JSON"}, status=400)
    except Exception as e:
        print(f"Error in login view: {str(e)}")
        return JsonResponse({"success": False, "message": "Server error"}, status=500)

def login_required_json(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            print("User not authenticated.")
            return JsonResponse({"error": "Authentication required"}, status=401)
        return view_func(request, *args, **kwargs)
    return _wrapped_view

@login_required_json
def home(request):
    print(f"Request user: {request.user} (is_authenticated: {request.user.is_authenticated})")
    print(f"Session data: {request.session.items()}")
    print(f"Session ID from cookies: {request.COOKIES.get('sessionid')}")
    
    if request.user.is_authenticated:
        print(f"Authenticated user: {request.user.username}")
        return JsonResponse({
            "username": request.user.username,
            "message": "Welcome to the home page!"
        })
    else:
        print("User is not authenticated.")
        return JsonResponse({"error": "User not authenticated"}, status=401)
    
    
@login_required_json
def api_home(request):
    return JsonResponse({"message": "This is your data"})

@csrf_exempt
def custom_logout(request):
    if request.method == 'POST':
        print(request.user)  # Should print the logged-in user
        print("Logged out successfully")
        logout(request)
        return JsonResponse({"success": True, "message": "Logged out successfully"})
    else:
        return JsonResponse({"message": "Please use POST method for logout"}, status=405)

