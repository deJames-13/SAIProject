# Generated by Django 5.1.3 on 2024-11-15 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('virustotal', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='urlreports',
            name='id',
            field=models.AutoField(auto_created=True, editable=False, primary_key=True, serialize=False),
        ),
    ]
