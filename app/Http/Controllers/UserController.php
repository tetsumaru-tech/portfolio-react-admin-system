<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Requests\UserSearchRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    const USER_LIST = [
        ['id' => 1, 'lastName' => '山田', 'firstName' => '太郎', 'email' => 'taro.yamada@example.com', 'gender' => 'male', 'birthday' => '1990-05-12', 'createdAt' => '2026-03-01T09:00:00'],
        ['id' => 2, 'lastName' => '佐藤', 'firstName' => '花子', 'email' => 'hanako.sato@example.com', 'gender' => 'female', 'birthday' => '1988-11-03', 'createdAt' => '2026-03-02T10:15:00'],
        ['id' => 3, 'lastName' => '鈴木', 'firstName' => '一郎', 'email' => 'ichiro.suzuki@example.com', 'gender' => 'male', 'birthday' => '1995-07-21', 'createdAt' => '2026-03-03T11:30:00'],
        ['id' => 4, 'lastName' => '高橋', 'firstName' => '美咲', 'email' => 'misaki.takahashi@example.com', 'gender' => 'female', 'birthday' => '1992-02-08', 'createdAt' => '2026-03-04T12:45:00'],
        ['id' => 5, 'lastName' => '伊藤', 'firstName' => '健', 'email' => 'ken.ito@example.com', 'gender' => 'male', 'birthday' => '1985-09-30', 'createdAt' => '2026-03-05T13:00:00'],
        ['id' => 6, 'lastName' => '渡辺', 'firstName' => '彩', 'email' => 'aya.watanabe@example.com', 'gender' => 'female', 'birthday' => '1998-01-17', 'createdAt' => '2026-03-06T14:20:00'],
        ['id' => 7, 'lastName' => '中村', 'firstName' => '大輔', 'email' => 'daisuke.nakamura@example.com', 'gender' => 'male', 'birthday' => '1993-06-25', 'createdAt' => '2026-03-07T15:10:00'],
        ['id' => 8, 'lastName' => '小林', 'firstName' => '由紀', 'email' => 'yuki.kobayashi@example.com', 'gender' => 'female', 'birthday' => '1987-12-14', 'createdAt' => '2026-03-08T16:40:00'],
        ['id' => 9, 'lastName' => '加藤', 'firstName' => '直樹', 'email' => 'naoki.kato@example.com', 'gender' => 'male', 'birthday' => '1991-04-09', 'createdAt' => '2026-03-09T17:05:00'],
        ['id' => 10, 'lastName' => '吉田', 'firstName' => '真由', 'email' => 'mayu.yoshida@example.com', 'gender' => 'female', 'birthday' => '1996-08-19', 'createdAt' => '2026-03-10T09:25:00'],
        ['id' => 11, 'lastName' => '田中', 'firstName' => '次郎', 'email' => 'jiro.tanaka@example.com', 'gender' => 'male', 'birthday' => '1989-03-15', 'createdAt' => '2026-03-11T10:00:00'],
        ['id' => 12, 'lastName' => '斎藤', 'firstName' => '美香', 'email' => 'mika.saito@example.com', 'gender' => 'female', 'birthday' => '1994-12-05', 'createdAt' => '2026-03-12T11:15:00'],
        ['id' => 13, 'lastName' => '松本', 'firstName' => '健太郎', 'email' => 'kentaro.matsumoto@example.com', 'gender' => 'male', 'birthday' => '1986-08-22', 'createdAt' => '2026-03-13T12:30:00'],
        ['id' => 14, 'lastName' => '井上', 'firstName' => '愛', 'email' => 'ai.inoue@example.com', 'gender' => 'female', 'birthday' => '1997-05-10', 'createdAt' => '2026-03-14T13:45:00'],
        ['id' => 15, 'lastName' => '木村', 'firstName' => '拓也', 'email' => 'takuya.kimura@example.com', 'gender' => 'male', 'birthday' => '1990-11-28', 'createdAt' => '2026-03-15T14:00:00'],
        ['id' => 16, 'lastName' => '林', 'firstName' => '優子', 'email' => 'yuko.hayashi@example.com', 'gender' => 'female', 'birthday' => '1988-07-03', 'createdAt' => '2026-03-16T15:20:00'],
        ['id' => 17, 'lastName' => '清水', 'firstName' => '浩', 'email' => 'hiroshi.shimizu@example.com', 'gender' => 'male', 'birthday' => '1995-04-14', 'createdAt' => '2026-03-17T16:10:00'],
        ['id' => 18, 'lastName' => '山崎', 'firstName' => '麻衣', 'email' => 'mai.yamazaki@example.com', 'gender' => 'female', 'birthday' => '1992-09-07', 'createdAt' => '2026-03-18T17:40:00'],
        ['id' => 19, 'lastName' => '森', 'firstName' => '隆', 'email' => 'takashi.mori@example.com', 'gender' => 'male', 'birthday' => '1987-01-25', 'createdAt' => '2026-03-19T09:05:00'],
        ['id' => 20, 'lastName' => '橋本', 'firstName' => '恵', 'email' => 'megumi.hashimoto@example.com', 'gender' => 'female', 'birthday' => '1999-06-18', 'createdAt' => '2026-03-20T10:25:00'],
        ['id' => 21, 'lastName' => '阿部', 'firstName' => '雄一', 'email' => 'yuichi.abe@example.com', 'gender' => 'male', 'birthday' => '1991-10-12', 'createdAt' => '2026-03-21T11:00:00'],
        ['id' => 22, 'lastName' => '石川', 'firstName' => '理恵', 'email' => 'rie.ishikawa@example.com', 'gender' => 'female', 'birthday' => '1985-02-20', 'createdAt' => '2026-03-22T12:15:00'],
        ['id' => 23, 'lastName' => '前田', 'firstName' => '誠', 'email' => 'makoto.maeda@example.com', 'gender' => 'male', 'birthday' => '1996-12-30', 'createdAt' => '2026-03-23T13:30:00'],
        ['id' => 24, 'lastName' => '岡田', 'firstName' => '奈々', 'email' => 'nana.okada@example.com', 'gender' => 'female', 'birthday' => '1993-03-08', 'createdAt' => '2026-03-24T14:45:00'],
        ['id' => 25, 'lastName' => '後藤', 'firstName' => '悠', 'email' => 'yu.goto@example.com', 'gender' => 'male', 'birthday' => '1989-07-16', 'createdAt' => '2026-03-25T15:00:00'],
        ['id' => 26, 'lastName' => '長谷川', 'firstName' => '美穂', 'email' => 'miho.hasegawa@example.com', 'gender' => 'female', 'birthday' => '1998-11-22', 'createdAt' => '2026-03-26T16:20:00'],
        ['id' => 27, 'lastName' => '村上', 'firstName' => '健一', 'email' => 'kenichi.murakami@example.com', 'gender' => 'male', 'birthday' => '1990-05-05', 'createdAt' => '2026-03-27T17:10:00'],
        ['id' => 28, 'lastName' => '近藤', 'firstName' => '彩花', 'email' => 'saika.kondo@example.com', 'gender' => 'female', 'birthday' => '1986-08-29', 'createdAt' => '2026-03-28T09:40:00'],
        ['id' => 29, 'lastName' => '藤田', 'firstName' => '大輝', 'email' => 'daiki.fujita@example.com', 'gender' => 'male', 'birthday' => '1994-01-11', 'createdAt' => '2026-03-29T10:05:00'],
        ['id' => 30, 'lastName' => '青木', 'firstName' => '桃子', 'email' => 'momoko.aoki@example.com', 'gender' => 'female', 'birthday' => '1997-04-03', 'createdAt' => '2026-03-30T11:25:00'],
    ];

    /**
     * ユーザーの一覧を取得する
     *
     * @param  UserSearchRequest  $request  検索リクエスト
     * @return JsonResponse ユーザーの一覧
     */
    public function index(UserSearchRequest $request): JsonResponse
    {
        // $query = User::query();
        // $name = $request->input('name');
        // if ($name) {
        //     $query->where(function ($q) use ($name) {
        //         $q->where('lastName', 'like', '%'.$name.'%')
        //             ->orWhereRaw('firstName', 'like', '%'.$name.'%')
        //             ->orWhereRaw('concat(firstName, lastName)', 'like', '%'.$name.'%')
        //             ->orWhereRaw("concat(firstName, ' ', lastName)", 'like', '%'.$name.'%');
        //     });
        // }
        // $email = $request->input('email');
        // if ($email) {
        //     $query->where('email', 'like', '%'.$email.'%');
        // }
        // $users = $query->orderBy('id', 'desc')->get();

        // return response()->json($users);

        $users = collect(self::USER_LIST);

        if ($name = $request->input('name')) {
            $users = $users->filter(function ($user) use ($name) {
                $fullName = $user['lastName'].$user['firstName'];
                $fullNameWithSpace = $user['lastName'].' '.$user['firstName'];

                return
                    str_contains($user['lastName'], $name) ||
                    str_contains($user['firstName'], $name) ||
                    str_contains($fullName, $name) ||
                    str_contains($fullNameWithSpace, $name) ||
                    str_contains($user['email'], $name);
            });
        }

        if ($email = $request->input('email')) {
            $users = $users->filter(function ($user) use ($email) {
                return str_contains($user['email'], $email);
            });
        }

        return response()->json($users->values());
    }

    /**
     * 指定されたIDのユーザーを取得する
     *
     * @param  int  $id  ユーザーID
     * @return JsonResponse ユーザー情報または404エラー
     */
    public function show(int $id): JsonResponse
    {
        $user = collect(self::USER_LIST)->firstWhere('id', $id);

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

        return response()->json(['id' => 11, ...$data, 'createdAt' => now()->toIso8601String()], 201);
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
        $user = collect(self::USER_LIST)->firstWhere('id', $id);
        if (! $user) {
            return response()->json(['message' => 'ユーザーが見つかりません'], 404);
        }
        $data = $request->validated();

        $updatedUser = [...$user, ...$data, 'updatedAt' => now()->toIso8601String()];
        Log::error($updatedUser);

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
        return response()->noContent();
    }
}
