from django.core.management.base import BaseCommand
from django.core.management import call_command
import os

class Command(BaseCommand):
    help = 'Load initial data fixtures'

    def handle(self, *args, **options):
        try:
            # Load the fixture data
            call_command('loaddata', 'initial_data.json', verbosity=2)
            self.stdout.write(
                self.style.SUCCESS('Initial data loaded successfully!')
            )
        except Exception as e:
            self.stdout.write(
                self.style.WARNING(f'Could not load initial data: {str(e)}')
            )
            self.stdout.write(
                self.style.WARNING('This is normal for first deployment.')
            )