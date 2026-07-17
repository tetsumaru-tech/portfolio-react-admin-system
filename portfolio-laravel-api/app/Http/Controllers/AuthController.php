<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * ログイン処理を行います。
     *
     * リクエストの検証済み資格情報で認証を試行し、成功した場合はユーザー情報を返します。
     * 失敗した場合は401エラーを返します。
     *
     * @param  LoginRequest  $request  検証済みログインリクエスト
     * @return JsonResponse 認証結果を含むJSONレスポンス
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (! Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json(['user' => Auth::user()]);
    }

    /**
     * 認証されたユーザーの情報を返します。
     *
     * @return JsonResponse 認証されたユーザーの情報を含むJSONレスポンス
     */
    public function me(): JsonResponse
    {
        if (! Auth::check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        return response()->json(['user' => Auth::user()]);
    }

    /**
     * ログアウト処理を行います。
     *
     * 現在の認証セッションを破棄し、成功時は204 No Contentを返します。
     *
     * @param  Request  $request  ログアウトリクエスト
     * @return JsonResponse ログアウト成功を示すJSONレスポンス
     */
    public function logout(): JsonResponse
    {
        Auth::logout();
        request()->session()->invalidate(); // 現在のセッションを破棄 かつ 新しいセッションIDを発行
        request()->session()->regenerateToken(); // CSRFトークン再発行

        return response()->json([
            'message' => 'Logged out',
        ]);
    }
}
