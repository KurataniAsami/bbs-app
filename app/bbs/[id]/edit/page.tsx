import {  getPost, updatePost } from '@/actions/post';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditPostPage({ params }: Props) {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <EditPostContent params={params} />
    </Suspense>
  );
}

async function EditPostContent({ params }:Props) {

  const { id } = await params;
  const post = await getPost(Number(id));

  if (!post) {
  notFound();
}

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className='font-bold text-xl'>編集</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updatePost}>
            <input
              type="hidden"
              name="id"
              value={post.id}
            />
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="title">
                タイトル
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={post.title}
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
                defaultValue={post.content}
                className="border border-gray-300 rounded p-2"
                placeholder="本文を入力"
              ></textarea>
            </div>

            <button type="submit" className="mt-5 bg-blue-500 px-4 py-2 rounded text-white">
              編集
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}