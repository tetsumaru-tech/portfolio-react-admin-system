<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

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
     * ルール差分が3つ以上発生したら、StoreUserRequest / UpdateUserRequest に分割すること
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $emailRule = $this->isMethod('post') ?
            ['required', 'email',  Rule::unique('users', 'email')]
            : ['required', 'email',  Rule::unique('users', 'email')->ignore($this->route('id'))];

        $rules = [
            'last_name' => 'required|string|max:10',
            'first_name' => 'required|string|max:10',
            'birthday' => 'required|date|before:today',
            'email' => $emailRule,
            'gender' => 'required|in:male,female,other',
        ];

        if ($this->isMethod('post')) {
            $rules['password'] = [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers(),
            ];
        }

        return $rules;
    }
}
