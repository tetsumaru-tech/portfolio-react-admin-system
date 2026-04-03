import type { UserFormData } from '@/features/user/types';

export const userApi = {
  create: async (data: UserFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 疑似通信
    console.log('保存データ:', data);
    return {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
    };
  },
};
