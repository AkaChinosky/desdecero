from django import forms
from .models import Producto, Cliente, Compra, Region, Comuna, CustomUser
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm

class ClienteForm(forms.ModelForm):
    region = forms.ModelChoiceField(queryset=Region.objects.all(), required=True)
    comuna = forms.ModelChoiceField(queryset=Comuna.objects.none(), required=True)

    class Meta:
        model = Cliente
        fields = ['nombre', 'apellido', 'email', 'telefono', 'rut', 'direccion', 'region', 'comuna']

    def clean_telefono(self):
        telefono = self.cleaned_data.get('telefono')
        return telefono

    def clean_rut(self):
        rut = self.cleaned_data.get('rut')
        return rut

    def __init__(self, *args, **kwargs):
        super(ClienteForm, self).__init__(*args, **kwargs)
        if 'region' in self.data:
            try:
                region_id = int(self.data.get('region'))
                self.fields['comuna'].queryset = Comuna.objects.filter(region_id=region_id).order_by('nombre')
            except (ValueError, TypeError):
                self.fields['comuna'].queryset = Comuna.objects.none()
        elif self.instance.pk:
            # Asegúrate de que self.instance.region no es una cadena
            if isinstance(self.instance.region, str):
                try:
                    region_id = int(self.instance.region)
                    self.fields['comuna'].queryset = Comuna.objects.filter(region_id=region_id).order_by('nombre')
                except (ValueError, TypeError):
                    self.fields['comuna'].queryset = Comuna.objects.none()
            else:
                self.fields['comuna'].queryset = self.instance.region.comuna_set.order_by('nombre')


class CompraForm(forms.ModelForm):
    class Meta:
        model = Compra
        fields = '__all__'

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'precio', 'stock', 'imagen']



class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('email',)  # Solo incluye el campo email

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('email',)  # Solo incluye el campo email

class CustomAuthenticationForm(AuthenticationForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'password')