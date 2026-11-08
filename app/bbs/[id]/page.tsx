import Link from "next/link";
import BbsDetail from "@/app/components/BbsDetail";
import { getPost } from "@/actions/post";
import { Suspense } from 'react';
import { verifySession } from "@/utils/session";
import DeleteButton from "@/app/components/DeleteButton";

type Props = {
  params: Promise<{ id: string }>;
};

// ① URLからIDを取得して記事データを取得する
export default function BbsDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <BbsDetailContent params={params} />
    </Suspense>
  );
}

// ①でデータ取得して表示
async function BbsDetailContent({ params }: Props) {
  const { id } = await params;

  const post = await getPost(Number(id));

  if (!post) return <p>記事が見つかりません</p>;

  // ログインユーザーを取得
  const session = await verifySession();

  // 投稿者とログインユーザーのIDを比較
  const isOwner =
    Number(session?.userId) === post.user.id;

  return (
    <div className="my-3">
      <Link href="/" className="text-blue-500 font-bold">
        ← 一覧へ戻る
      </Link>

      <div className="mt-3">
        <BbsDetail
          id={post.id}
          title={post.title}
          content={post.content}
          userName={post.user.name}
          createdAt={post.createdAt}
        />

        {isOwner && (
          <DeleteButton postId={post.id} />
        )}
      </div>
    </div>
  );
}
