import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '請輸入郵箱' })
    .refine((value) => z.email().safeParse(value).success, {
      message: '請輸入有效的郵箱格式',
    }),
  password: z
    .string()
    .min(1, { message: '請輸入密碼' })
    .min(6, { message: '密碼長度至少6個字符' }),
});

export const signupSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(1, { message: '請輸入確認密碼' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '兩次輸入的密碼不一致',
    path: ['confirmPassword'],
  });
