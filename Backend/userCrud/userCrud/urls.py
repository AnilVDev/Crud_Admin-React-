from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from crud_app.views import MyTokenObtainPairView, AuthenticationView
from rest_framework_simplejwt.views import (
    TokenRefreshView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('crud_app.urls')), 
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('authenticate/', AuthenticationView.as_view(), name='authenticate'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)