import Image from "next/image";
import { prisma } from "@/libs/prisma";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const posts = await prisma.bbsPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div>
      <h1>掲示板</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <Card>
            <CardHeader>
              <CardTitle
                className="text-blue-500 font-bold text-xl"
              >{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>投稿者：{post.user.name}</p>
              {post.content}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
