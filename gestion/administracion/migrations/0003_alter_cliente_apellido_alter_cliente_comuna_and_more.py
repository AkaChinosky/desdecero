# Generated by Django 5.0.6 on 2024-06-30 21:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administracion', '0002_cliente_apellido_cliente_comuna_cliente_direccion_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='apellido',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='comuna',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='direccion',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='region',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='rut',
            field=models.CharField(default='', max_length=12),
        ),
    ]
