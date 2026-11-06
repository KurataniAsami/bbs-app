'use server';

import { redirect } from 'next/navigation';
import { revalidateTag, cacheTag, updateTag } from 'next/cache';
// import { AppDataSource, getRepository } from '@/utils/data-source';
import { verifySession } from '@/utils/session';
import { error } from 'console';
import { prisma } from '@/libs/prisma';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title || !content) {
    return { error: 'タイトルと本文を入力してください' };
  }

  // ユーザーがログインしているかチェック
  try {
    const session = await verifySession();

    if (!session || !session.userId) {
      return { error: 'ログインしてください' };
    }

    // ユーザーIDからユーザーを取得
    const user = await prisma.bbsUser.findUnique({
      where: {
        id: Number(session.userId),
      },
    });

    if (!user) {
      return { error: 'ユーザーが見つかりません' };
    }

    // 投稿を作成
    await prisma.bbsPost.create({
      data: {
        title,
        content,
        userId: user.id,
      },
    });

  } catch (e) {
    console.error(e);
    return { error: '投稿の作成中にエラーが発生しました' };
  }

  updateTag('posts');
  redirect('/');
}

export async function getPosts() {
  'use cache';
  cacheTag('posts');


  // 投稿一覧を取得（作成日時の降順）
  const posts = await prisma.bbsPost.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });

  return posts;
}

export async function getPost(id: number) {
  'use cache';
  cacheTag(`post-${id}`);

  const posts = await prisma.bbsPost.findMany({
     orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });

  if (!posts) return null;
}

// export async function deletePost(id: number) {
//   const session = await verifySession();

//   if (!session || !session.userId) {
//     return { error: 'ログインしてください' };
//   }

//   const postRepository = await getRepository(Post);
//   const post = await postRepository.findOne({
//     where: { id },
//     relations: { user: true },
//   });

//   if (!post) {
//     return { error: '投稿が見つかりません' };
//   }

//   // 本人の投稿か確認
//   if (post.user.id !== Number(session.userId)) {
//     return { error: '削除権限がありません' };
//   }

//   await postRepository.remove(post);

//   updateTag('posts');
//   updateTag('posts');
//   redirect('/');
// }