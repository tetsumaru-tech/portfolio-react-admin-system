<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Requests\UserSearchRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * ユーザーの一覧を取得する
     *
     * @param  UserSearchRequest  $request  検索リクエスト
     * @return JsonResponse ユーザーの一覧
     */
    public function index(UserSearchRequest $request): JsonResponse
    {
        $query = User::query();
        $name = $request->input('name');
        if ($name) {
            $query->where(function ($q) use ($name) {
                $q->where('last_name', 'like', "%{$name}%")
                    ->orWhere('first_name', 'like', "%{$name}%")
                    ->orWhereRaw(
                        'concat(last_name, first_name) like ?',
                        ["%{$name}%"]
                    )
                    ->orWhereRaw(
                        "concat(last_name, ' ', first_name) like ?",
                        ["%{$name}%"]
                    );
            });
        }
        $email = $request->input('email');
        if ($email) {
            $query->where('email', 'like', '%'.$email.'%');
        }
        $users = $query->orderBy('id', 'asc')->get();

        return response()->json($users);
    }

    /**
     * 指定されたIDのユーザーを取得する
     *
     * @param  int  $id  ユーザーID
     * @return JsonResponse ユーザー情報または404エラー
     */
    public function show(int $id): JsonResponse
    {
        $user = User::find($id);

        return $user ? response()->json($user) : response()->json(['message' => 'ユーザーが見つかりません'], 404);
    }

    /**
     * 新しいユーザーを作成する
     *
     * @param  UserRequest  $request  ユーザー作成リクエスト
     * @return JsonResponse 作成されたユーザー情報
     */
    public function store(UserRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = User::create($data);

        return response()->json($user, 201);
    }

    /**
     * 指定されたIDのユーザーを更新する
     *
     * @param  UserRequest  $request  ユーザー更新リクエスト
     * @param  int  $id  ユーザーID
     * @return JsonResponse 更新されたユーザー情報または404エラー
     */
    public function update(UserRequest $request, int $id): JsonResponse
    {
        $user = User::find($id);
        if (! $user) {
            return response()->json(['message' => 'ユーザーが見つかりません'], 404);
        }
        $data = $request->validated();
        $user->update($data);
        $updatedUser = $user->fresh();

        return response()->json($updatedUser);
    }

    /**
     * 指定されたIDのユーザーを削除する
     *
     * @param  int  $id  ユーザーID
     * @return Response 204 No Content
     */
    public function destroy(int $id): Response
    {
        User::destroy($id);

        return response()->noContent();
    }
}
