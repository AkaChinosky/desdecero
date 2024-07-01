from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import register_view, login_view

urlpatterns = [
    
    path('principal/', views.principal, name='principal'),
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
    
    path('', views.index, name='index'),
    path('indexlog/', views.indexlog, name='indexlog'),
    path('inicio/', views.inicio, name='inicio'),
    path('iniciolog/', views.iniciolog, name='iniciolog'),
    path('quienes_somos/', views.quienes_somos, name='quienes_somos'),
    path('tiendaa/', views.tiendaa, name='tiendaa'),
    path('tiendaBlancAntes/', views.tiendaBlancAntes, name='tiendaBlancAntes'),
    path('tiendaCalent/', views.tiendaCalent, name='tiendaCalent'),
    path('tiendaDoradaFem/', views.tiendaDoradaFem, name='tiendaDoradaFem'),
    path('tiendaDoradaHom/', views.tiendaDoradaHom, name='tiendaDoradaHom'),
    path('tiendaLocalFem/', views.tiendaLocalFem, name='tiendaLocalFem'),
    path('tiendaPortero/', views.tiendaPortero, name='tiendaPortero'),
    path('tiendaRoja/', views.tiendaRoja, name='tiendaRoja'),
    path('tiendaVisita/', views.tiendaVisita, name='tiendaVisita'),
    path('home/', views.home, name='home'),
    path('product_detail/', views.product_detail, name='product_detail'),
    path('login/', views.login_view, name='login'),
    path('admin/', views.admin_view, name='admin'),
    path('boleta/', views.boleta, name='boleta'),
    path('pago/', views.pago_view, name='pago'),
    path('perfil/', views.perfil, name='perfil'),
    path('direccion/', views.direccion, name='direccion'),
    path('historial/', views.historial, name='historial'),
    path('envio/', views.envio, name='envio'),
    path('boleta_view/', views.boleta_view, name='boleta_view'),
    path('indexlog/', views.indexlog, name='indexlog'),
    path('producto/<int:producto_id>/', views.detalle_producto, name='detalle_producto'),
    path('custom_login/', views.custom_admin, name='custom_login'),
    path('custom_admin/', views.admin_view, name='custom_admin'),
    path('register/', register_view, name='indexlog'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)