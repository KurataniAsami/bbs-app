'use server';

import { redirect } from 'next/navigation';
import bcrypt from "bcrypt";
// import { User } from '@/entities/User';
// import { User } from '@/types/post';
// import { getRepository } from '@/utils/data-source';
import { createSession, deleteSession } from '@/utils/session';
import { prisma } from '@/libs/prisma';

export async function signup(formData: FormData) {
  const userName = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!userName || !email || !password) {
    return { error: 'すべてのフィールドを入力してください' };
  }

  try {
    // メールアドレスの重複チェック
    const existingUser = await prisma.bbsUser.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'このメールアドレスは既に使用されています' };
    }

    // bcryptでハッシュ化されたパスワードをDBに保存
    // (password, 10)は計算コストのことで文字数制限ではない
    // npm install -D @types/bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー作成
    const savedUser = await prisma.bbsUser.create({
      data: {
        name: userName,   // nameはスキーマのプロパティとあわせる
        email,
        password: hashedPassword,
      },
    });

    await createSession(savedUser.id.toString());
  } catch (e) {
    console.error(e);
    return { error: 'ユーザー登録中にエラーが発生しました' };
  }
  redirect('/');
}

// export async function login(formData: FormData) {
//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;

//   try {
//     const userRepository = await getRepository(User);
//     const user = await userRepository.findOneBy({ email });

//     if (!user) {
//       return { error: 'メールアドレスまたはパスワードが正しくありません' };
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return { error: 'メールアドレスまたはパスワードが正しくありません' };
//     }

//     await createSession(user.id.toString());
//   } catch (e) {
//     console.error(e);
//     return { error: 'ログイン中にエラーが発生しました' };
//   }
//   redirect('/');
// }

// export async function logout() {
//   await deleteSession();
//   redirect('/login');
// }
