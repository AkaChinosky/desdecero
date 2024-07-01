from django.db import models
from django.core.validators import EmailValidator, RegexValidator,  MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)

    def __str__(self):
        return self.nombre
    
class ImagenProducto(models.Model):
    imagen = models.ImageField(upload_to="productos")
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="imagenes")


class Cliente(models.Model):
    nombre = models.CharField(max_length=200)
    apellido = models.CharField(max_length=200)
    email = models.EmailField(validators=[EmailValidator()])
    telefono = models.CharField(max_length=12,validators=[RegexValidator(regex=r'^\+56\d{9}$',message="El número de teléfono debe ingresarse en el formato: '+56912345678'. 9 dígitos después del código de país '+56'.")])
    rut = models.CharField(max_length=20, validators=[RegexValidator(regex=r'^\d{1,2}\.\d{3}\.\d{3}-[0-9Kk]$', message="El RUT debe ingresarse en el formato: 'XX.XXX.XXX-X'.")])
    direccion = models.CharField(max_length=255)
    region = models.CharField(max_length=100)
    comuna = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"


class Compra(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    cantidad = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(200)])
    

    def __str__(self):
        return f"{self.cantidad} de {self.producto.nombre} por {self.cliente.nombre}"

@receiver(pre_save, sender=Compra)
def restore_stock(sender, instance, **kwargs):
    if instance.pk:  # Si la compra ya existe (es una actualización)
        old_instance = Compra.objects.get(pk=instance.pk)
        instance.producto.stock += old_instance.cantidad

@receiver(post_save, sender=Compra)
def update_stock(sender, instance, created, **kwargs):
    instance.producto.stock -= instance.cantidad
    instance.producto.save()

@receiver(post_delete, sender=Compra)
def replenish_stock(sender, instance, **kwargs):
    instance.producto.stock += instance.cantidad
    instance.producto.save()

class Region(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Comuna(models.Model):
    nombre = models.CharField(max_length=100)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email