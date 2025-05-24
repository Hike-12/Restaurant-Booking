#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate --verbosity=2

# Load initial data
python manage.py load_initial_data

# Create superuser automatically
python manage.py create_superuser

echo "Build completed successfully!"