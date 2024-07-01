
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import Producto, Cliente, Compra
from .forms import ProductoForm, ClienteForm, CompraForm, Comuna
import requests
from django.http import JsonResponse
from django.shortcuts import render
from datetime import date
from django.contrib import messages
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import CustomUserCreationForm, CustomAuthenticationForm

def load_comunas(request):
    region_id = request.GET.get('region_id')
    comunas = Comuna.objects.filter(region_id=region_id).order_by('nombre')
    return JsonResponse(list(comunas.values('id', 'nombre')), safe=False)


def principal(request):
    total_productos = Producto.objects.count()
    total_compras = Compra.objects.count()
    total_clientes = Cliente.objects.count()
    compras_recientes = Compra.objects.order_by('-fecha')[:5]

    # Datos para el gráfico
    compras_labels = [compra.producto.nombre for compra in compras_recientes]
    compras_data = [compra.cantidad for compra in compras_recientes]

    response = requests.get('https://api.exchangerate-api.com/v4/latest/USD')
    exchange_rates = response.json() if response.status_code == 200 else {}


    context = {
        'total_productos': total_productos,
        'total_compras': total_compras,
        'total_clientes': total_clientes,
        'compras_recientes': compras_recientes,
        'compras_labels': compras_labels,
        'compras_data': compras_data,
        'exchange_rates': exchange_rates,
    }
    
    return render(request, 'pagina/principal.html', context)

def listar_productos(request):
    productos = Producto.objects.all()
    return render(request, 'pagina/listar_productos.html', {'productos': productos})

def agregar_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('listar_productos')
    else:
        form = ProductoForm()
    return render(request, 'pagina/agregar_producto.html', {'form': form})

def editar_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    if request.method == 'POST':
        form = ProductoForm(request.POST, instance=producto)
        if form.is_valid():
            form.save()
            return redirect('listar_productos')
    else:
        form = ProductoForm(instance=producto)
    return render(request, 'pagina/editar_producto.html', {'form': form})

def eliminar_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    if request.method == 'POST':
        producto.delete()
        return redirect('listar_productos')
    return render(request, 'pagina/eliminar_producto.html', {'producto': producto})


def listar_clientes(request):
    clientes = Cliente.objects.all()
    return render(request, 'pagina/listar_clientes.html', {'clientes': clientes})

def agregar_cliente(request):
    if request.method == 'POST':
        form = ClienteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_clientes')
    else:
        form = ClienteForm()
    return render(request, 'pagina/agregar_cliente.html', {'form': form})

def load_comunas(request):
    region_id = request.GET.get('region')
    comunas = Comuna.objects.filter(region_id=region_id).order_by('nombre')
    return JsonResponse(list(comunas.values('id', 'nombre')), safe=False)

def editar_cliente(request, pk):
    cliente = get_object_or_404(Cliente, pk=pk)
    if request.method == 'POST':
        form = ClienteForm(request.POST, instance=cliente)
        if form.is_valid():
            form.save()
            return redirect('listar_clientes')
    else:
        form = ClienteForm(instance=cliente)
    return render(request, 'pagina/editar_cliente.html', {'form': form})

def eliminar_cliente(request, pk):
    cliente = get_object_or_404(Cliente, pk=pk)
    if request.method == 'POST':
        cliente.delete()
        return redirect('listar_clientes')
    return render(request, 'pagina/eliminar_cliente.html', {'cliente': cliente})

# Vistas para compras
def listar_compras(request):
    compras = Compra.objects.all()
    return render(request, 'pagina/listar_compras.html', {'compras': compras})

def agregar_compra(request):
    if request.method == 'POST':
        form = CompraForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_compras')
    else:
        form = CompraForm()
    return render(request, 'pagina/agregar_compra.html', {'form': form})

def editar_compra(request, pk):
    compra = get_object_or_404(Compra, pk=pk)
    if request.method == 'POST':
        form = CompraForm(request.POST, instance=compra)
        if form.is_valid():
            form.save()
            return redirect('listar_compras')  
    else:
        form = CompraForm(instance=compra)
    return render(request, 'pagina/editar_compra.html', {'form': form})

def eliminar_compra(request, pk):
    compra = get_object_or_404(Compra, pk=pk)
    if request.method == 'POST':
        compra.delete()
        return redirect('listar_compras')  
    return render(request, 'pagina/eliminar_compra.html', {'compra': compra})

def home(request):
    return render(request,'tienda/home.html')

def product_detail(request, product_id):
    # Lógica para obtener el detalle del producto usando product_id
    return render(request, 'product_detail.html', {'product_id': product_id})

def index(request):
    return render(request, 'index.html')
def boleta(request):
    return render(request, 'boleta.html')
def direccion(request):
    return render(request, 'direccion.html')
def historial(request):
    return render(request, 'historial.html')
def envio(request):
    return render(request, 'envio.html')
def home(request):
    return render(request, 'home.html')
def indexlog(request):
    return render(request, 'indexlog.html')
def inicio(request):
    return render(request, 'inicio.html')

def iniciolog(request):
    productos = Producto.objects.all()
    return render(request, 'iniciolog.html', {'productos': productos})



def pago(request):
    return render(request, 'pago.html')
def perfil(request):
    return render(request, 'perfil.html')
def quienes_somos(request):
    return render(request, 'QuieneSomos.html')
def tiendaa(request):
    return render(request, 'tiendaa.html')
def tiendaBlancAntes(request):
    return render(request, 'tiendaBlancAntes.html')
def tiendaCalent(request):
    return render(request, 'tiendaCalent.html')
def tiendaDoradaFem(request):
    return render(request, 'tiendaDoradaFem.html')
def tiendaDoradaHom(request):
    return render(request, 'tiendaDoradaHom.html')
def tiendaLocalFem(request):
    return render(request, 'tiendaLocalFem.html')
def tiendaPortero(request):
    return render(request, 'tiendaPortero.html')
def tiendaRoja(request):
    return render(request, 'tiendaRoja.html')
def tiendaVisita(request):
    return render(request, 'tiendaVisita.html')
def admin_view(request):
    return render(request, 'admin.html')
def pago_view(request):
    return render(request, 'pago.html')
def boleta_view(request):
    return render(request, 'boleta.html')
def custom_admin(request):
    return render(request, 'adminbenja/admin.html')
def producto_view(request):
    return render(request, 'adminbenja/barra/producto.html')



def indexlog(request):
    return render(request, 'indexlog.html')

def alguna_vista(request):
    return render(request, 'indexlog.html')

def boleta_view(request):
    # Lógica para obtener la fecha actual
    fecha_actual = date.today().strftime("%d DE %B DEL %Y")  # Formato personalizable

    # Lógica para obtener el último monto del carrito (simulado aquí)
    ultimo_monto = request.session.get('ultimo_monto', 0)  # Ejemplo: obtén el último monto guardado en la sesión

    context = {
        'fecha_actual': fecha_actual,
        'ultimo_monto': ultimo_monto,
    }
    return render(request, 'boleta.html', context)

def detalle_producto(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    return render(request, 'detalle_producto.html', {'producto': producto})


def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('index')  # Redirige a indexlog.html después del registro
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data.get('username'), password=form.cleaned_data.get('password'))
            if user is not None:
                login(request, user)
                return redirect('index')  # Redirige a indexlog.html después del login
    else:
        form = CustomAuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})