# Generated by Django 2.0.6 on 2019-05-09 00:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20190509_0017'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='viplevel',
            options={'verbose_name': '会员等级', 'verbose_name_plural': '会员等级'},
        ),
        migrations.AlterModelTable(
            name='address',
            table='gd_address',
        ),
        migrations.AlterModelTable(
            name='user',
            table='gd_user',
        ),
        migrations.AlterModelTable(
            name='viplevel',
            table='gd_vip_level',
        ),
    ]
