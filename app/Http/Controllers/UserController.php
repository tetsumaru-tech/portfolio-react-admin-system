<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordUpdateRequest;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserSearchRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

        $this->applySort($query, $request);

        $perPage = (int) $request->input('perPage', 10);

        $users = $query->paginate($perPage);

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
        unset($data['password_confirmation']);

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

    /**
     * ソート条件を適用する
     *
     * @param  Builder  $query  クエリビルダー
     * @param  Request  $request  リクエスト
     */
    private function applySort(Builder $query, Request $request): void
    {
        $sortableColumns = [
            'id',
            'full_name',
            'email',
            'birthday',
        ];
        $sortBy = $request->input('sortBy');
        $sortOrder = strtolower($request->input('sortOrder', 'asc')) === 'desc' ? 'desc' : 'asc';
        if (! $sortBy || ! in_array($sortBy, $sortableColumns, true)) {
            return;
        }

        match ($sortBy) {
            'full_name' => $query->orderByRaw("concat(last_name, first_name) {$sortOrder}"),
            default => $query->orderBy($sortBy, $sortOrder),
        };
    }

    /**
     * 指定されたIDのユーザーのパスワードを更新する
     *
     * @param  PasswordUpdateRequest  $request  パスワード更新リクエスト
     * @param  int  $id  ユーザーID
     * @return JsonResponse 更新結果のメッセージ
     */
    public function updatePassword(PasswordUpdateRequest $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        if (! empty($request->current_password) && ! Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => '現在のパスワードが違います',
            ], 422);
        }

        $user->update([
            'password' => $request->password,
        ]);

        return response()->json([
            'message' => 'パスワードを変更しました',
        ]);
    }
}
