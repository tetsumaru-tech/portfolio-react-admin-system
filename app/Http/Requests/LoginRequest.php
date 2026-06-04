<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * ユーザーがこのリクエストを行うことを許可するかどうかを判断します。
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // 誰でもこのリクエストを行うことができます
    }

    /**
     * リクエストの検証ルールを取得します。
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email', // メールアドレスは必須で、正しい形式である必要があります
            'password' => 'required|string|min:6', // パスワードは必須で、文字列で、最低6文字必要です
        ];
    }
}
