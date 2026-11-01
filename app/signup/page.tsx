'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signup } from '@/actions/auth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const result = await signup(formData);

    if (result && result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className='text-center text-xl'>アカウント登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="username">
                ユーザー名
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 bg-white text-black rounded-md p-2
                  outline-none focus:border-blue-500 focus:ring-1"
                placeholder="ユーザー名"
                required
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mb-1" htmlFor="email">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 bg-white text-black rounded-md p-2
                  outline-none focus:border-blue-500 focus:ring-1"
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 bg-white text-black rounded-md p-2
                  outline-none focus:border-blue-500 focus:ring-1 mt-2"
                placeholder="********"
                required
              />
            </div>

            {error && <p className="text-red-600 mt-3">{error}</p>}

            <button
              type="submit"
              className="w-full mt-3 rounded py-3 bg-blue-500 text-white"
              style={{ width: '100%', marginBottom: '15px' }}
            >
              登録する
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '14px' }}>
            すでにアカウントをお持ちですか？ <br />
            <Link href="/login" style={{ color: '#0070f3' }}>
              ログインはこちら
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}