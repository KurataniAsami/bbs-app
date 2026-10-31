import Image from "next/image";
import { prisma } from "@/libs/prisma";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import BbsDetail from "@/app/components/BbsDetail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BbsDetailPage({ params }: Props) {
  const { id } = await params;

  const post = await prisma.bbsPost.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: true,
    },
  });

  if (!post) return <p>記事が見つかりません</p>

  return (
    <div className="my-3">
      <Link
        href="./"
        className="text-blue-500 font-bold"  
      >
        ← 一覧へ戻る
      </Link>

      <div className="mt-3">
        <BbsDetail
          title={post.title}
          content={post.content}
          userName={post.user.name}
          createdAt={post.user.createdAt}
        />
      </div>
    </div>
  );
};
