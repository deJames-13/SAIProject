# Generated by Django 5.1.3 on 2024-11-16 05:37

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Analyses',
            fields=[
                ('id', models.AutoField(auto_created=True, editable=False, primary_key=True, serialize=False)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('scan_id', models.TextField()),
                ('description', models.TextField(default='')),
                ('reputation', models.TextField()),
                ('votes', models.JSONField()),
                ('times_submitted', models.IntegerField()),
                ('last_analysis_stats', models.JSONField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FileReports',
            fields=[
                ('id', models.AutoField(auto_created=True, editable=False, primary_key=True, serialize=False)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('file_name', models.TextField()),
                ('file_type', models.TextField()),
                ('hashes', models.JSONField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('analysis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='virustotal.analyses')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'indexes': [models.Index(fields=['file_name'], name='virustotal__file_na_380b98_idx'), models.Index(fields=['file_type'], name='virustotal__file_ty_caa352_idx'), models.Index(fields=['timestamp'], name='virustotal__timesta_62b497_idx')],
            },
        ),
        migrations.CreateModel(
            name='ScanHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, editable=False, primary_key=True, serialize=False)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('title', models.TextField()),
                ('message', models.TextField()),
                ('scan_type', models.CharField(max_length=200)),
                ('scan_date', models.DateTimeField()),
                ('permalink', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('analysis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='virustotal.analyses')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'indexes': [models.Index(fields=['scan_type'], name='virustotal__scan_ty_af7d28_idx'), models.Index(fields=['title'], name='virustotal__title_38e481_idx'), models.Index(fields=['timestamp'], name='virustotal__timesta_7daff5_idx')],
            },
        ),
        migrations.CreateModel(
            name='UrlReports',
            fields=[
                ('id', models.AutoField(auto_created=True, editable=False, primary_key=True, serialize=False)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('title', models.TextField()),
                ('url', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('analysis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='virustotal.analyses')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'indexes': [models.Index(fields=['url'], name='virustotal__url_e84bd9_idx'), models.Index(fields=['timestamp'], name='virustotal__timesta_7596a8_idx')],
            },
        ),
    ]
