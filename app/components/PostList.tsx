import { getPosts } from "@/actions/post"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default async function PostList() {
  const posts = await getPosts();

  if(!posts) {
    return <p>記事がありません</p>
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Card>
            <CardHeader>
              <CardTitle
                className="text-blue-500 font-bold text-xl"
              >
                <Link href={`/bbs/${post.id}`}>
                  {post.title}
                </Link>
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-3">
                <p>投稿者：{post.user.name} |</p>
                <p>作成日：{post.user.createdAt.toLocaleDateString()}</p>
              </div>
              {post.content}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}