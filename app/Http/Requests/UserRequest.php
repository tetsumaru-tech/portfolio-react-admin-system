<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $roles = [
            'lastName' => 'sometimes|required|string|max:5',
            'firstName' => 'sometimes|required|string|max:50',
            'email' => 'sometimes|required|email|max:255',
            'birthday' => 'nullable|date|before:today',
        ];

        if ($this->isMethod('post')) {
            $roles['lastName'] = 'required|string|max:5';
            $roles['firstName'] = 'required|string|max:50';
            $roles['email'] = 'required|email|max:255|unique:users,email';
        }
        Log::debug('Validation rules: ', $roles);

        return $roles;
    }
}
