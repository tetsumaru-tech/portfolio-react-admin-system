<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

// #[Fillable(['last_name', 'first_name', 'email', 'birthday', 'gender', 'password', 'remember_token'])]
#[Fillable(['last_name', 'first_name', 'email', 'birthday', 'gender'])]
#[Hidden(['password', 'remember_token'])]
// class User extends Authenticatable
class User extends Model
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // protected $fillable = ['last_name', 'first_name', 'email', 'birthday', 'gender', 'password', 'remember_token'];
    protected $fillable = ['last_name', 'first_name', 'email', 'birthday', 'gender'];
}
