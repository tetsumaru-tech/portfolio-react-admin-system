<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * ユーザーのプロフィール関連処理を担当するコントローラ
 */
class ProfileController extends Controller
{
    /**
     * ユーザーのプロフィール情報を返却します。
     *
     * @param  Request  $request  認証済みのリクエストインスタンス
     * @return JsonResponse ユーザー情報を含むJSONレスポンス
     */
    public function show(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    /**
     * ユーザーのプロフィールを更新します。
     *
     * @param  ProfileRequest  $request  バリデーション済みのリクエスト
     * @return JsonResponse 更新結果を含むJSONレスポンス
     */
    public function update(ProfileRequest $request): JsonResponse
    {
        $data = $request->validated();

        /** @var User $user */
        $user = Auth::user();
        $user->update($data);

        return response()->json(['message' => 'プロフィールを更新しました']);
    }
}
