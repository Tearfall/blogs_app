FROM richarvey/nginx-php-fpm:1.7.2

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs

# Upgrade Composer to version 2
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --2 --install-dir=/usr/local/bin --filename=composer && \
    rm composer-setup.php

COPY . .

COPY conf/nginx/nginx-site.conf /etc/nginx/sites-available/default

COPY scripts/00-laravel-deploy.sh /etc/my_init.d/00-laravel-deploy.sh
RUN chmod +x /etc/my_init.d/00-laravel-deploy.sh

# Build frontend assets
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Image config
#ENV SKIP_COMPOSER=1
ENV WEBROOT=/var/www/html/public
ENV PHP_ERRORS_STDERR=1
ENV RUN_SCRIPTS=1

ENV REAL_IP_HEADER=1

# Laravel config
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER=1

CMD ["/start.sh"]
