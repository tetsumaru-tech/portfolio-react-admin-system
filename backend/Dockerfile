##################
# Render用Dockerfile
##################

# CLI版PHP
FROM php:8.4-cli

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
        gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 作業ディレクトリ
WORKDIR /var/www/html

# Composer関連だけ先にコピー(変更がなければ、後続のRUNはスキップするため)
COPY composer.json composer.lock ./

# Composer install
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

# ソースコードをコピー
COPY . .

EXPOSE 10000

CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]