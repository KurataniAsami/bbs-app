'use client';

import { useState } from 'react';
import Link from 'next/link';
import { login } from '@/actions/auth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const result = await login(formData);
    if (result && result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className='text-center text-xl'>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
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
              className="w-full mt-3 rounded py-3 mb-3 bg-blue-500 text-white"
            >
              ログイン
            </button>
          </form>

          <p className='text-center'>
            アカウントをお持ちでないですか？ <br />
            <Link href="/signup" className='text-blue-500'>
              アカウント登録はこちら
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}