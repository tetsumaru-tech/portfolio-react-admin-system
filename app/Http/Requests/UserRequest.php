<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * ユーザーがこのリクエストを実行する権限があるか判定する。
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * リクエストに適用されるバリデーションルールを取得する。
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'lastName' => 'sometimes|required|string|max:8',
            'firstName' => 'sometimes|required|string|max:8',
            'email' => 'sometimes|required|email|max:255',
            'birthday' => 'nullable|date|before:today',
        ];

        if ($this->isMethod('post')) {
            $rules['lastName'] = 'required|string|max:5';
            $rules['firstName'] = 'required|string|max:50';
            $rules['email'] = 'required|email|max:255|unique:users,email';
        }

        return $rules;
    }
}
