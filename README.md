# Coding Test App

https://coding-test-tau.vercel.app/

### 環境構築

```ts
npm install
```

環境変数のサンプルが .env.local.example になります。
新規のFirebaseプロジェクトの値で動作確認可能かと思いますが
ローカルで動作確認する際に環境変数の値が必要な場合にはご連絡ください。

### 動作確認

```ts
npm run dev
```

### E2Eテスト

```ts
npm run test:e2e
```

### ESLint + Prettier実行

```ts
npm run lint-fix
```

### ディレクトリ構成 (随時更新)

```ts
.
├── .vscode
│   ├── extensions.json   vscodeにインストールするプラグイン
│   └── settings.json     vscodeの設定ファイル
├── e2e                   e2eテスト用ディレクトリ
├── src
│   ├── app               App Routerのページング用ディレクトリ
│   ├── conponents        コンポーネント用ディレクトリ
│   ├── lib               ライブラリを使用する関数用ディレクトリ
│   └── utils             各種utilsの関数用ディレクトリ
├── .env.local.example    環境変数のサンプル
├── .gitignore            Git対象外の設定ファイル
├── .prettierrcc          prettierの設定ファイル
├── eslint.config.mjs     eslintの設定ファイル
├── next-env.d.ts
├── next.config.mjs       nextjsの設定ファイル
├── package-lock.json
├── package.json
├── playwright.config.ts  e2eテストの設定ファイル
├── README.md
└── tsconfig.json         typescriptの設定ファイル
```

### TODO

課題の要求を最優先で実装しているため
実際のアプリとして不足がかなりあります。

- デザインの精度
- Auth情報やユーザー情報をstoreで管理
- 新規登録の際のメールアドレスの認証
- メールアドレス、パスワード以外のユーザー登録手段
- 登録情報更新用ページ
- ユーザー名のユニーク化
- 各コンポーネントをContainerでPresentationalに分割
- 投稿一覧の遅延読み込み
