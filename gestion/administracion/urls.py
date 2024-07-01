from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path


urlpatterns = [
    
    path('', views.principal, name='principal'),
    path('productos/', views.listar_productos, name='listar_productos'),
    path('productos/agregar/', views.agregar_producto, name='agregar_producto'),
    path('productos/editar/<int:pk>/', views.editar_producto, name='editar_producto'),
    path('productos/eliminar/<int:pk>/', views.eliminar_producto, name='eliminar_producto'),
    
    path('clientes/', views.listar_clientes, name='listar_clientes'),
    path('clientes/agregar/', views.agregar_cliente, name='agregar_cliente'),
    path('ajax/load-comunas/', views.load_comunas, name='ajax_load_comunas'),
    path('clientes/editar/<int:pk>/', views.editar_cliente, name='editar_cliente'),
    path('clientes/eliminar/<int:pk>/', views.eliminar_cliente, name='eliminar_cliente'),
    
    path('compras/', views.listar_compras, name='listar_compras'),
    path('compras/agregar/', views.agregar_compra, name='agregar_compra'),
    path('compras/editar/<int:pk>/', views.editar_compra, name='editar_compra'),
    path('compras/eliminar/<int:pk>/', views.eliminar_compra, name='eliminar_compra'),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)