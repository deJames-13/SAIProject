# Generated by Django 5.1.3 on 2024-11-15 15:51

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
                ('name', models.TextField()),
                ('file', models.FileField(upload_to='uploads/')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('hashes', models.JSONField()),
                ('scan_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='virustotal.analyses')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'indexes': [models.Index(fields=['name'], name='virustotal__name_9beee5_idx'), models.Index(fields=['timestamp'], name='virustotal__timesta_62b497_idx')],
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
                ('scan_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='virustotal.analyses')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'indexes': [models.Index(fields=['scan_id'], name='virustotal__scan_id_8c6893_idx'), models.Index(fields=['title'], name='virustotal__title_38e481_idx'), models.Index(fields=['timestamp'], name='virustotal__timesta_7daff5_idx')],
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
                ('scan_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='virustotal.analyses')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'indexes': [models.Index(fields=['url'], name='virustotal__url_e84bd9_idx'), models.Index(fields=['timestamp'], name='virustotal__timesta_7596a8_idx')],
            },
        ),
    ]
