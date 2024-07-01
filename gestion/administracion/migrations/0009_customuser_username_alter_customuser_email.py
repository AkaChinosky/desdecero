# Generated by Django 5.0.6 on 2024-07-01 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administracion', '0008_remove_customuser_username_customuser_date_joined_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='username',
            field=models.CharField(default='20240701083554', max_length=150, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]