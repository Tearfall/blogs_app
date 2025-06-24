#!/usr/bin/env bash

echo "Running composer"
# This might be needed depending on your composer setup, if not, remove it.
# composer global require hirak/prestissimo --no-interaction
composer install --no-dev --optimize-autoloader --working-dir=/var/www/html

echo "Clearing caches..."
php artisan optimize:clear

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running npm install..."
npm install

echo "Running npm build..."
npm run build

echo "Running migrations..."
php artisan migrate --force

echo "Starting Nginx and PHP-FPM..."
# This assumes the base image's default entrypoint is /start.sh which then starts nginx/php-fpm.
# If your base image uses a different entrypoint, adjust accordingly.
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
