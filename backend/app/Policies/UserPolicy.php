<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * ユーザー一覧
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin';
    }

    /**
     * ユーザー詳細
     */
    public function view(User $user, User $model): bool
    {
        return $user->role === 'admin'
            || $user->id === $model->id;
    }

    /**
     * ユーザー作成
     */
    public function create(User $user): bool
    {
        return $user->role === 'admin';
    }

    /**
     * ユーザー編集
     */
    public function update(User $user, User $model): bool
    {
        return $user->role === 'admin'
            || $user->id === $model->id;
    }

    /**
     * ユーザー削除
     */
    public function delete(User $user, User $model): bool
    {
        return $user->role === 'admin';
    }

    /**
     * パスワード変更
     */
    public function updatePassword(User $user, User $model): bool
    {
        return $user->role === 'admin'
           || $user->id === $model->id;
    }
}
