<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * /users/* と /profile の認可境界を固定するテスト。
 *
 * 認可要件は次のとおり。
 * - /users/* は管理者専用。判定は AdminMiddleware だけが行う
 * - 本人が自分の情報を扱う操作は /profile 側で行う
 *
 * 403 の message が空文字であることは、判定が AdminMiddleware で行われたことを示す
 * （abort(403) にメッセージを渡していないため）。
 */
class UserAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 一般ユーザーは /users/* のどのアクションも利用できない。
     */
    public function test_non_admin_user_cannot_access_any_users_endpoint(): void
    {
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        $other = User::factory()->create([
            'role' => 'user',
        ]);

        $responses = [
            'index' => $this->actingAs($user)->getJson('/api/users'),
            'show' => $this->actingAs($user)->getJson('/api/users/'.$other->id),
            'store' => $this->actingAs($user)->postJson('/api/users', []),
            'update' => $this->actingAs($user)->putJson('/api/users/'.$other->id, []),
            'destroy' => $this->actingAs($user)->deleteJson('/api/users/'.$other->id),
            'updatePassword' => $this->actingAs($user)->patchJson('/api/users/'.$other->id.'/password', []),
        ];

        foreach ($responses as $action => $response) {
            $this->assertSame(403, $response->getStatusCode(), "{$action} は403を返すこと");
            $this->assertSame('', $response->json('message'), "{$action} の403は AdminMiddleware 由来であること");
        }
    }

    /**
     * 一般ユーザーは自分自身のレコードであっても /users/{id} を利用できない。
     *
     * 本人操作は /profile 側で行うため、/users/* に本人向けの例外を設けていない。
     */
    public function test_non_admin_user_cannot_access_own_record_via_users_endpoint(): void
    {
        $user = User::factory()->create([
            'role' => 'user',
        ]);

        $response = $this->actingAs($user)->getJson('/api/users/'.$user->id);

        $response->assertStatus(403);
        $response->assertJsonPath('message', '');
    }

    /**
     * 一般ユーザーは /profile で自分の情報を参照・更新できる。
     */
    public function test_non_admin_user_can_read_and_update_own_profile(): void
    {
        $user = User::factory()->create([
            'role' => 'user',
        ]);

        $this->actingAs($user)->getJson('/api/profile')->assertStatus(200);

        $this->actingAs($user)->putJson('/api/profile', [
            'last_name' => '本人',
            'first_name' => '太郎',
            'email' => 'self.update@example.com',
            'birthday' => '1990-01-01',
            'gender' => 'male',
        ])->assertStatus(200);
    }

    /**
     * 管理者は /users/* を利用できる。
     */
    public function test_admin_user_can_access_users_endpoints(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        $target = User::factory()->create([
            'role' => 'user',
        ]);

        $this->actingAs($admin)->getJson('/api/users')->assertStatus(200);
        $this->actingAs($admin)->getJson('/api/users/'.$target->id)->assertStatus(200);
        $this->actingAs($admin)->deleteJson('/api/users/'.$target->id)->assertStatus(204);
    }

    /**
     * 未認証では /users/* を利用できない。
     */
    public function test_unauthenticated_request_to_user_detail_returns_401(): void
    {
        $target = User::factory()->create([
            'role' => 'user',
        ]);

        $response = $this->getJson('/api/users/'.$target->id);

        $response->assertStatus(401);
        $response->assertJsonPath('message', 'Unauthenticated.');
    }

    /**
     * 管理者が存在しないIDを指定した場合は404を返す。
     *
     * show / update はコントローラ内の404、destroy / updatePassword は findOrFail の404であり、
     * メッセージの形は揃っていない。
     */
    public function test_admin_request_to_missing_user_returns_404(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->actingAs($admin)->getJson('/api/users/999999')
            ->assertStatus(404)
            ->assertJsonPath('message', 'ユーザーが見つかりません');

        $this->actingAs($admin)->deleteJson('/api/users/999999')->assertStatus(404);

        $this->actingAs($admin)->patchJson('/api/users/999999/password', [
            'password' => 'NewPassword123',
            'password_confirmation' => 'NewPassword123',
        ])->assertStatus(404);
    }
}
