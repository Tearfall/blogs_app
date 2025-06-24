FROM php:8.2-cli

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install system dependencies and Node.js/npm
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    nodejs \
    npm \
    && docker-php-ext-install zip pdo pdo_mysql

WORKDIR /app

# Copy package files and install frontend dependencies first (better cache)
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build frontend assets
RUN npm run build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Cache Laravel config
RUN php artisan config:cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
