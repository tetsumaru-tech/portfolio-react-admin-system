# Laravel API バックエンド

Laravel 13とPHP 8.3で構築した、堅牢なRESTful API。React管理画面ポートフォリオのバックエンドとして機能し、ユーザー管理、認証、権限管理エンドポイントを提供します。包括的なセキュリティ実装が特徴です。

## 📋 概要

エンタープライズLaravel開発のベストプラクティスを実践しています：

- **型安全性**: Laravel 13による厳密な型ヒント
- **API セキュリティ**: CSRF保護、レート制限、権限管理ポリシー
- **認証**: Laravel Sanctumによる SPA認証
- **テスト**: Mockeryを使用したPHPUnitの包括的カバレッジ
- **コード品質**: PHPStanとLaravel Pintによる静的解析

## 🚀 機能

### 認証・権限管理
- **Laravel Sanctum**: クッキーベースのSPA認証
- **ロールベース アクセス制御**: AdminユーザーとUserロールによる権限管理ポリシー
- **ミドルウェア保護**: 認証・管理者のみのルート保護
- **セキュアエンドポイント**: CSRF保護とセキュアなパスワード処理

### ユーザー管理
- **ユーザーAPI エンドポイント**: 作成・読取・更新・削除操作
- **プロフィール操作**: ユーザー情報と設定管理
- **パスワード管理**: セキュアなパスワード リセット・変更機能
- **ユーザーリスト**: 管理画面用のページング・フィルタ対応ユーザーリスト

### API機能
- **RESTful設計**: 標準HTTPメソッドとステータスコード
- **JSON API**: 一貫したJSON レスポンス形式
- **バリデーション**: サーバーサイド フォームリクエスト検証と詳細なエラーメッセージ
- **ページング**: 設定可能なページベースデータ ページング
- **エラーハンドリング**: 有意義なエラーレスポンスの包括的な実装

## 🛠 技術スタック

### コア
- **PHP** 8.3
- **Laravel Framework** 13
- **MySQL** (データベース)

### 認証・セキュリティ
- **Laravel Sanctum** 4.3 (SPA認証)
- **CSRF保護** (ビルトイン)
- **権限管理ポリシー** (ロールベース)

### 開発・テスト
- **PHPUnit** 12.5 (テストフレームワーク)
- **Mockery** 1.6 (テスト モック)
- **PHPStan** 2.1 (静的解析)
- **Laravel Pint** 1.29 (コード フォーマッティング)
- **FakerPHP** 1.23 (ダミーデータ生成)

### ツール
- **Composer** (PHP依存管理)
- **Artisan** (Laravel コマンドラインインターフェース)
- **Tinker** (対話型シェル)

## 📦 インストール

### 必要環境
- PHP 8.3以上
- Composer
- MySQL 8.0以上 または SQLite
- Node.js 18以上 (Viteフロントエンド アセット コンパイル用)

### セットアップ

```bash
# リポジトリをクローン
git clone <repository>
cd laravel-api

# セットアップスクリプトを実行（依存関係インストール、キー生成、マイグレーション）
composer run setup

# または手動で実行：
# 1. Composer依存をインストール
composer install

# 2. 環境ファイルをコピー
cp .env.example .env

# 3. アプリケーション キーを生成
php artisan key:generate

# 4. データベース マイグレーションを実行
php artisan migrate

# 5. npm依存をインストール
npm install --ignore-scripts

# 6. フロントエンド アセットをビルド
npm run build
```

### 環境変数
`.env.example` をベースに `.env` ファイルを作成：
```env
APP_NAME=PortfolioAPI
APP_ENV=local
APP_DEBUG=true
APP_KEY=base64:... (key:generateで生成)
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:5174
SESSION_DOMAIN=localhost
```

## 🚀 開発方法

```bash
# 開発サーバーとすべてのサービスを起動
# (Laravelサーバー、キューワーカー、Pailログ、Viteを含む)
composer run dev

# または個別にサービスを起動：
php artisan serve              # サーバー起動（http://localhost:8000）
php artisan queue:listen       # キューイングされたジョブを処理
php artisan pail               # アプリケーション ログを表示

# テスト実行
composer run test

# コード フォーマッティング実行
composer run format

# 静的解析実行
composer run lint
```

## 📁 プロジェクト構成

```
app/
├── Http/
│   ├── Controllers/     # API コントローラ
│   ├── Requests/        # フォーム検証リクエスト
│   └── Middleware/      # カスタムミドルウェア
├── Models/              # Eloquentモデル
├── Policies/            # 権限管理ポリシー
├── Providers/           # サービス プロバイダ
└── Services/            # ビジネスロジック サービス

database/
├── migrations/          # データベース マイグレーション
├── factories/           # テスト用モデル ファクトリ
└── seeders/            # データベース シーダー

routes/
├── api.php             # APIルート
└── console.php         # Artisanコマンド

tests/
├── Unit/               # ユニット テスト
└── Feature/            # 機能・統合テスト
```

## 🔐 認証フロー

1. クライアントが認証情報を `/login` エンドポイントに送信
2. サーバーが検証して認証トークン（HttpOnly クッキー）を発行
3. クライアントが以降のリクエストに自動的にクッキーを含める
4. サーバーがトークンを検証してリクエストを処理
5. ログアウト時、トークンを無効化してクッキーをクリア

## 📝 コマンド一覧

| コマンド | 説明 |
|---------|------|
| `composer run setup` | 完全セットアップ（インストール、キー生成、マイグレーション、ビルド） |
| `composer run dev` | すべての開発サービスを起動 |
| `composer run test` | PHPUnitテスト実行 |
| `composer run format` | Laravel Pintフォーマッター実行 |
| `composer run lint` | PHPStan静的解析実行 |
| `php artisan migrate` | データベース マイグレーション実行 |
| `php artisan seed` | データベース シーダー実行 |

## 📚 APIエンドポイント

### 認証
- `POST /api/login` - ユーザーログイン
- `POST /api/logout` - ユーザーログアウト
- `GET /api/user` - 現在のユーザープロフィール取得

### ユーザー管理（管理者のみ）
- `GET /api/users` - ユーザーリスト取得（ページング対応）
- `POST /api/users` - 新規ユーザー作成
- `GET /api/users/{id}` - ユーザー詳細取得
- `PUT /api/users/{id}` - ユーザー情報更新
- `DELETE /api/users/{id}` - ユーザー削除

### プロフィール
- `PUT /api/profile` - 自身のプロフィール更新
- `PUT /api/password` - パスワード変更

## 🧪 テスト

```bash
# すべてのテストを実行
php artisan test

# 特定のテストファイルを実行
php artisan test tests/Feature/AuthTest.php

# カバレッジ付きで実行
php artisan test --coverage
```

## 🔗 関連プロジェクト

- [React 管理画面ポートフォリオ](../react-admin-portfolio) - フロントエンド Reactアプリケーション

## 📄 ライセンス

このプロジェクトはオープンソースで、MITライセンスの下で利用可能です。
