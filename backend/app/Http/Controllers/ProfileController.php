<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfilePasswordRequest;
use App\Http\Requests\ProfileRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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

        return response()->json([
            'message' => 'プロフィールを更新しました']
        );
    }

    public function updatePassword(ProfilePasswordRequest $request
    ): JsonResponse {
        /** @var User $user */
        $user = Auth::user();

        if (! Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => '現在のパスワードが正しくありません',
                'error' => [
                    'current_password' => [
                        '現在のパスワードが正しくありません',
                    ],
                ],
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'パスワードを変更しました',
        ]);
    }
}
