from django.http import JsonResponse

class JsonAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Allow public access to specific API endpoints (like table booking availability)
        # if request.path.startswith('/api/') and not request.user.is_authenticated:
            # Allow unauthenticated access to specific paths
        if request.path in ['/api/table-bookings/', '/api/book-table/']:
            return self.get_response(request)

            # return JsonResponse({'error': 'Authentication required.'}, status=403)
        response = self.get_response(request)
        return response

