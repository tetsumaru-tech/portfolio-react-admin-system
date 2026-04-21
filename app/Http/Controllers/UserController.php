<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    const USER_LIST = [
        ['id' => 1, 'lastName' => '山田', 'firstName' => '太郎', 'email' => 'taro.yamada@example.com', 'birthday' => '1990-05-12', 'createdAt' => '2026-03-01T09:00:00'],
        ['id' => 2, 'lastName' => '佐藤', 'firstName' => '花子', 'email' => 'hanako.sato@example.com', 'birthday' => '1988-11-03', 'createdAt' => '2026-03-02T10:15:00'],
        ['id' => 3, 'lastName' => '鈴木', 'firstName' => '一郎', 'email' => 'ichiro.suzuki@example.com', 'birthday' => '1995-07-21', 'createdAt' => '2026-03-03T11:30:00'],
        ['id' => 4, 'lastName' => '高橋', 'firstName' => '美咲', 'email' => 'misaki.takahashi@example.com', 'birthday' => '1992-02-08', 'createdAt' => '2026-03-04T12:45:00'],
        ['id' => 5, 'lastName' => '伊藤', 'firstName' => '健', 'email' => 'ken.ito@example.com', 'birthday' => '1985-09-30', 'createdAt' => '2026-03-05T13:00:00'],
        ['id' => 6, 'lastName' => '渡辺', 'firstName' => '彩', 'email' => 'aya.watanabe@example.com', 'birthday' => '1998-01-17', 'createdAt' => '2026-03-06T14:20:00'],
        ['id' => 7, 'lastName' => '中村', 'firstName' => '大輔', 'email' => 'daisuke.nakamura@example.com', 'birthday' => '1993-06-25', 'createdAt' => '2026-03-07T15:10:00'],
        ['id' => 8, 'lastName' => '小林', 'firstName' => '由紀', 'email' => 'yuki.kobayashi@example.com', 'birthday' => '1987-12-14', 'createdAt' => '2026-03-08T16:40:00'],
        ['id' => 9, 'lastName' => '加藤', 'firstName' => '直樹', 'email' => 'naoki.kato@example.com', 'birthday' => '1991-04-09', 'createdAt' => '2026-03-09T17:05:00'],
        ['id' => 10, 'lastName' => '吉田', 'firstName' => '真由', 'email' => 'mayu.yoshida@example.com', 'birthday' => '1996-08-19', 'createdAt' => '2026-03-10T09:25:00'],

    ];

    public function index(): JsonResponse
    {
        return response()->json(self::USER_LIST);
    }

    public function show(int $id): JsonResponse
    {
        $user = collect(self::USER_LIST)->firstWhere('id', $id);

        return $user ? response()->json($user) : response()->json(['error' => 'User not found'], 404);
    }

    public function store(UserRequest $request): JsonResponse
    {
        $data = $request->validated();

        return response()->json(['id' => 11, ...$data, 'createdAt' => now()->toIso8601String()]);
    }

    public function update(UserRequest $request, int $id): JsonResponse
    {
        $user = collect(self::USER_LIST)->firstWhere('id', $id);
        if (! $user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $data = $request->validated();

        $updatedUser = [...$user, ...$data, 'updatedAt' => now()->toIso8601String()];

        return response()->json($updatedUser);
    }

    public function destroy(int $id): JsonResponse
    {
        return response()->json(['message' => "User with id $id deleted"]);
    }
}
