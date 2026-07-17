# Portfolio React Admin System

React 管理画面と Laravel REST API を組み合わせた、ポートフォリオ管理システムのモノレポです。フロントエンドとバックエンドを分離しながら、認証・権限管理・ユーザー管理・データ管理を一つの構成で提供します。

## 📋 プロジェクト概要

このリポジトリには、次の 2 つのアプリケーションが含まれています。

- フロントエンド: React + TypeScript + Material UI を用いた管理画面
- バックエンド: Laravel + Sanctum を用いた REST API

両者は Cookie ベースの認証で連携し、管理者・一般ユーザーの権限分離を実現しています。

## ✨ 主な機能

### フロントエンド

- SPA 認証と自動ログアウト
- ロールベースアクセス制御
- ユーザー CRUD 操作
- プロフィール・パスワード管理
- リアルタイム検索・サーバーサイドページング・ソート
- Toast 通知・確認ダイアログ・エラーハンドリング
- レスポンシブ UI

### バックエンド

- Laravel Sanctum による SPA 認証
- ロールベース権限管理
- ユーザー管理 API
- バリデーションとエラーハンドリング
- PHPUnit / PHPStan / Laravel Pint による品質管理

## 🛠 技術スタック

### フロントエンド

- React 19
- TypeScript 5.9
- Vite 7 / 8
- Material UI 7
- MUI X Data Grid
- React Query
- React Hook Form
- Zod

### バックエンド

- PHP 8.3
- Laravel 13
- Laravel Sanctum 4.3
- MySQL
- PHPUnit 12.5
- PHPStan 2.1
- Laravel Pint 1.29

## 🏗 アーキテクチャ

```text
Browser / Client
      │
      ▼
React Admin Frontend
      │
      │ HTTP / REST + Cookie Auth
      ▼
Laravel API Backend
      │
      ▼
MySQL Database
```

## 📁 ディレクトリ構成

```text
portfolio-react-admin-system/
├── backend/                # Laravel API
│   ├── app/                # Controllers / Models / Policies / Providers
│   ├── config/             # 設定ファイル
│   ├── database/           # Migrations / Seeders / Factories
│   ├── routes/             # API ルート
│   └── tests/              # PHPUnit テスト
├── frontend/               # React 管理画面
│   ├── src/                # アプリケーション本体
│   │   ├── components/     # 共通 UI コンポーネント
│   │   ├── features/       # 機能別モジュール
│   │   ├── hooks/          # カスタムフック
│   │   ├── layouts/        # レイアウト
│   │   ├── pages/          # ページコンポーネント
│   │   └── router/         # ルーティング
│   └── package.json
└── README.md               # このファイル
```

## 🚀 セットアップ

### 必要環境

- Node.js 18 以上
- PHP 8.3 以上
- Composer
- MySQL 8.0 以上または SQLite

### バックエンド

```bash
cd backend
composer install
cp .env.example .env   # もし存在する場合
php artisan key:generate
php artisan migrate
```

### フロントエンド

```bash
cd frontend
npm install
```

必要に応じて、フロントエンドの環境変数に API の URL を設定します。

```env
VITE_API_URL=http://localhost:8000
```

## ▶️ 開発実行

### バックエンド起動

```bash
cd backend
composer run dev
```

このコマンドで、Laravel サーバー・キュー・ログ表示・Vite アセット処理がまとめて起動します。

### フロントエンド起動

```bash
cd frontend
npm run dev
```

- フロントエンド: http://localhost:5173
- バックエンド: http://localhost:8000

## 🧪 開発コマンド

### フロントエンド

```bash
cd frontend
npm run dev
npm run build
npm run lint
npm run preview
```

### バックエンド

```bash
cd backend
composer run setup
composer run dev
composer run test
composer run format
composer run lint
```

## 🔐 認証フロー

1. フロントエンドからログイン情報を送信
2. バックエンドが認証を行い、HttpOnly Cookie を返す
3. 以降のリクエストに Cookie が自動付与される
4. バックエンドが認可を行い、必要に応じて 401 / 403 を返す

## 📚 API エンドポイント例

### 認証

- POST /api/login
- POST /api/logout
- GET /api/user

### ユーザー管理（管理者向け）

- GET /api/users
- POST /api/users
- GET /api/users/{id}
- PUT /api/users/{id}
- DELETE /api/users/{id}

### プロフィール

- PUT /api/profile
- PUT /api/password

## 📄 ドキュメント

- [backend/README.md](backend/README.md)
- [frontend/README.md](frontend/README.md)

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
