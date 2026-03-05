# Firebase 配置说明

## 1. 安装依赖

```bash
npm install firebase
```

## 2. 创建 Firebase 项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 创建新项目或选择现有项目
3. 在项目设置中，添加 Web 应用（或使用现有 Web 应用）
4. 获取 Firebase 配置信息

## 3. 配置环境变量

在项目根目录创建 `.env` 文件（已存在于 .gitignore）：

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 4. 启用 Firebase Authentication

1. 在 Firebase Console 中，进入 **Authentication** > **Sign-in method**
2. 启用 **Email/Password** 登录方式

## 5. 设置 Firestore 数据库

1. 在 Firebase Console 中，进入 **Firestore Database**
2. 创建数据库（选择生产模式或测试模式）
3. 设置安全规则（开发阶段可以使用测试规则）：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 6. 重启开发服务器

配置完成后，重启 Expo 开发服务器：

```bash
npm start
```

## 注意事项

- `.env` 文件已添加到 `.gitignore`，不会被提交到版本控制
- 确保 Firebase 配置信息正确，否则应用将无法连接到 Firebase
- 在生产环境中，建议使用 EAS Secrets 来管理环境变量

