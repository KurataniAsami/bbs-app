import { getPost } from "@/actions/post";
import { verifySession } from "@/utils/session";
import BbsDetailPage from "./BbsDetail";

type Props = {
  params: Promise<{ id: string }>
}

// URLからIDを取得して記事データを取得する
export default async function BbsDetailContent({ params }: Props) {
  const { id } = await params;

  const postId = Number(id);
  const post = await getPost(postId);

  if (!post) return <p>記事が見つかりません</p>;

  // 投稿者のみ記事を削除できるようにする
  const session = await verifySession();
  const isOwner =
  Number(session?.userId) === post.user.id;

  return (
    <div>
          <p>ログインユーザーID：{session?.userId ?? 'なし'}</p>
    <p>投稿者ID：{post.user.id}</p>
    <p>本人判定：{String(isOwner)}</p>
      <BbsDetailPage
        id={post.id}
        title={post.title}
        content={post.content}
        userName={post.user.name}
        createdAt={post.createdAt}
      />
    </div>
  );
}


