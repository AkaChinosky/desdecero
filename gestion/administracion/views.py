
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import Producto, Cliente, Compra
from .forms import ProductoForm, ClienteForm, CompraForm, Comuna
import requests
from django.http import JsonResponse
from django.shortcuts import render


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

