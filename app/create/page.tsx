'use client';

import { useState } from 'react';
import { createPost } from '@/actions/post';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CreatePostPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);

    const result = await createPost(formData);
    if (result && result.error) {
      setError(result.error);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className='font-bold text-xl'>新規投稿</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="title">
                タイトル
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border border-gray-300 rounded p-2"
                placeholder="タイトルを入力"
              />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="content">
                本文
              </label>

              <textarea
                id="content"
                name="content"
                className="border border-gray-300 rounded p-2"
                placeholder="本文を入力"
              ></textarea>
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="mt-5 bg-blue-500 px-4 py-2 rounded text-white">
              投稿する
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}