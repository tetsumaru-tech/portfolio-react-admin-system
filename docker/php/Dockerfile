FROM php:8.4-fpm

# 必要パッケージ
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo_mysql \
        intl \
        zip \
        bcmath \
        gd

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 作業ディレクトリ
WORKDIR /var/www/html