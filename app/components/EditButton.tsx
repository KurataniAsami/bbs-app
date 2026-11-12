'use client'

import { deletePost } from "@/actions/post"
import Link from "next/link"

export default function EditButton({ postId }: { postId: number }) {
  const handleEdit = async () => {
    await deletePost(postId)
  }

  return (
    <div>
      <Link href={`/bbs/${postId}/edit`}
        className="bg-blue-500 text-white px-2 py-1 rounded-sm"
      >
        編集
      </Link>
    </div>
  )
}

// editのアクション作成、呼び出し