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
            'last_name' => 'sometimes|required|string|max:8',
            'first_name' => 'sometimes|required|string|max:8',
            'birthday' => 'sometimes|required|date|before:today',
            'email' => 'sometimes|required|email|max:255|unique:users,email',
            'gender' => 'sometimes|required|in:male,female,other',
        ];

        // if ($this->isMethod('post')) {
        //     $rules['email'] = 'required|email|max:255|unique:users,email';
        // }

        return $rules;
    }
}
