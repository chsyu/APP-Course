/**
 * 前端示範用：無真實後端，按下登入／註冊即視為成功。
 */
const MOCK_UID = 'local-demo-user';

export async function signIn(email, _password) {
  return {
    user: { uid: MOCK_UID, email: email.trim() },
    error: null,
  };
}

export async function signUp(email, _password) {
  return {
    user: { uid: MOCK_UID, email: email.trim() },
    error: null,
  };
}

export async function logout() {
  return {
    user: null,
    error: null,
  };
}
