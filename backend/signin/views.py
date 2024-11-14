import json
from django.http import JsonResponse
from django.views import View
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')  # Use this temporarily for testing only
class LoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)  # Parse JSON from request body
            email = data.get("email")
            password = data.get("password")

            # Find the user by email and get the username
            try:
                user = User.objects.get(email=email)
                username = user.username
                user = authenticate(username=username, password=password)

                if user is not None:
                    return JsonResponse({"message": "Login successful"}, status=200)
                else:
                    return JsonResponse({"message": "Invalid email or password"}, status=400)

            except User.DoesNotExist:
                return JsonResponse({"message": "Invalid email or password"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON format"}, status=400)
