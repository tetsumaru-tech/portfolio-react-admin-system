<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * APIが返すエラーレスポンスの契約を固定するテスト。
 *
 * 401 / 403 / 422 について、フロントエンドの共通API層が依存している
 * ステータスコードとレスポンスの形を検証する。
 * バリデーションメッセージの文言は翻訳に依存するため固定しない。
 */
class ApiErrorResponseTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 未認証で認証必須APIへアクセスすると401を返す。
     */
    public function test_unauthenticated_request_to_protected_api_returns_401(): void
    {
        $response = $this->getJson('/api/users');

        $response->assertStatus(401);
        $response->assertJsonStructure(['message']);
        $response->assertJsonPath('message', 'Unauthenticated.');
        $response->assertJsonMissingPath('errors');
    }

    /**
     * Accept ヘッダーがなくても認証必須APIは401 JSONを返す。
     */
    public function test_unauthenticated_api_request_without_json_accept_header_returns_401(): void
    {
        $response = $this->get('/api/users');

        $response->assertStatus(401);
        $response->assertHeader('content-type', 'application/json');
        $response->assertJsonPath('message', 'Unauthenticated.');
        $response->assertJsonMissingPath('errors');
    }

    /**
     * 管理者以外が管理者専用APIへアクセスすると403を返す。
     *
     * AdminMiddleware の abort(403) はメッセージを持たないため message は空文字になる。
     */
    public function test_non_admin_user_request_to_admin_api_returns_403(): void
    {
        $user = User::factory()->create([
            'role' => 'user',
        ]);

        $response = $this->actingAs($user)->getJson('/api/users');

        $response->assertStatus(403);
        $response->assertJsonStructure(['message']);
        $response->assertJsonPath('message', '');
        $response->assertJsonMissingPath('errors');
    }

    /**
     * 入力値が不正な場合は422とフィールド単位のerrorsを返す。
     *
     * errors のキーはAPI側の命名（snake_case）で返る。
     */
    public function test_invalid_user_payload_returns_422_with_validation_errors(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $response = $this->actingAs($admin)->postJson('/api/users', [
            'last_name' => str_repeat('a', 11),
            'first_name' => '太郎',
            'email' => 'validation.target@example.com',
            'birthday' => '1990-01-01',
            'gender' => 'male',
            'password' => 'Password123',
            'password_confirmation' => 'Password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'errors' => ['last_name']]);
        $response->assertJsonValidationErrors(['last_name']);
        $response->assertJsonMissingValidationErrors([
            'first_name',
            'email',
            'birthday',
            'gender',
            'password',
        ]);
    }
}
