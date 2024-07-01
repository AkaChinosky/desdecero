# Generated by Django 5.0.6 on 2024-06-30 21:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administracion', '0003_alter_cliente_apellido_alter_cliente_comuna_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='imagen',
            field=models.ImageField(blank=True, null=True, upload_to='productos'),
        ),
        migrations.CreateModel(
            name='ImagenProducto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen', models.ImageField(upload_to='productos')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administracion.producto')),
            ],
        ),
    ]
