<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * プロフィールのパスワード変更APIのテスト。
 *
 * 現在のパスワードの検証は ProfilePasswordRequest の current_password ルールが担当し、
 * Controller側は同じ検証を持たない。その前提が崩れていないことを確認する。
 */
class ProfilePasswordTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 現在のパスワードが誤っている場合は422を返す。
     */
    public function test_profile_password_update_with_wrong_current_password_returns_422(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->patchJson('/api/profile/password', [
            'current_password' => 'wrong-password',
            'password' => 'NewPassword123',
            'password_confirmation' => 'NewPassword123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'errors' => ['current_password']]);
        $response->assertJsonValidationErrors(['current_password']);
    }

    /**
     * 現在のパスワードが正しい場合はパスワードを更新する。
     */
    public function test_profile_password_can_be_updated_with_correct_current_password(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->patchJson('/api/profile/password', [
            'current_password' => 'password',
            'password' => 'NewPassword123',
            'password_confirmation' => 'NewPassword123',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['message']);

        $this->assertTrue(Hash::check('NewPassword123', $user->fresh()->password));
    }
}
