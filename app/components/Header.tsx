import { logout } from '@/actions/auth';
import { verifySession } from '@/utils/session';
import Link from 'next/link';

export default async function Header() {
  // ログイン時のみの表示
  const session = await verifySession();

  return (
    <div>
      <div
        className="bg-black text-white px-2 py-3"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>
          <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            BBS App
          </Link>
        </h1>

        {session?.userId ? (
          <nav className='flex gap-5'>
            <Link href="/create" style={{ fontWeight: 'bold' }}>
              投稿する
            </Link>

            <form action={logout}>
              <button
                type="submit"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                ログアウト
              </button>
            </form>
          </nav>
        ) : (
          // 未ログイン
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/login" style={{ fontWeight: 'bold' }}>
              ログイン
            </Link>

            <Link href="/signup" style={{ fontWeight: 'bold' }}>
              新規登録
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}