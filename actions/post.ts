'use server';

import { redirect } from 'next/navigation';
import { cacheTag, updateTag } from 'next/cache';
import { verifySession } from '@/utils/session';
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

// 詳細
export async function getPost(id: number) {
  'use cache';
  cacheTag(`post-${id}`);

  const post = await prisma.bbsPost.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });

  if (!post) return null;

  return post;
}

// 編集
export async function updatePost(formData: FormData) {
  const id = Number(formData.get('id'));
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // 記事を更新
  await prisma.bbsPost.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });

  // キャッシュを更新
  updateTag('posts');
  updateTag(`post-${id}`);

  redirect('/');
}

// 削除
export async function deletePost(id: number) {
  const session = await verifySession();

  if (!session || !session.userId) {
    return { error: 'ログインしてください' };
  }

  const post = await prisma.bbsPost.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true
    },
  })

  if (!post) {
    return { error: '投稿が見つかりません' };
  }

  // 本人の投稿か確認
  if (post.user.id !== Number(session.userId)) {
    return { error: '削除権限がありません' };
  }

  await prisma.bbsPost.delete({
    where: {
      id: id,
    },
  });

  // 一覧と詳細の両方のキャッシュを更新
  updateTag('posts');
  updateTag(`post-${id}`);
  
  redirect('/');
}