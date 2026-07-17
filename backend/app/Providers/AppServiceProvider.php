<?php

namespace App\Providers;

use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * アプリケーションのサービスを登録する
     */
    public function register(): void
    {
        //
    }

    /**
     * アプリケーションのブート処理を実行する
     */
    public function boot(): void
    {
        Gate::policy(User::class, UserPolicy::class);
    }
}
