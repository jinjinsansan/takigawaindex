import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
// import { useSession, signOut } from 'next-auth/react'
import { useSession, signOut } from '@/lib/auth-mock' // 開発用モック

const Header = () => {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <>
      {/* トップバー（ネット競馬風） */}
      <div className="bg-gray-800 text-white text-xs py-1">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>瀧川指数 - 元地方競馬ジョッキー監修の競馬予想</span>
          </div>
          <div className="flex items-center space-x-4">
            {session && (
              <span>ポイント: <span className="font-bold text-yellow-400">{session.user?.points || 0}pt</span></span>
            )}
          </div>
        </div>
      </div>

      {/* メインヘッダー */}
      <header className="bg-white border-b-2 border-gray-300 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* ロゴ */}
            <Link href="/" className="flex items-center group">
              <div className="flex items-center">
                {/* 指数・分析を表すアイコン */}
                <div className="mr-3">
                  <svg className="w-7 h-7 text-amber-600" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12L7 16L13 10L17 14L21 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="7" cy="16" r="2" fill="currentColor"/>
                    <circle cx="13" cy="10" r="2" fill="currentColor"/>
                    <circle cx="17" cy="14" r="2" fill="currentColor"/>
                    <circle cx="21" cy="10" r="2" fill="currentColor"/>
                  </svg>
                </div>
                
                {/* テキスト部分 */}
                <div>
                  <div className="text-gray-800 font-black text-xl leading-none" style={{ letterSpacing: '0.02em' }}>
                    瀧川指数
                  </div>
                  <div className="text-amber-600 text-[10px] font-bold tracking-wider">
                    TAKIGAWA INDEX
                  </div>
                </div>
              </div>
            </Link>

            {/* デスクトップナビゲーション */}
            <nav className="hidden md:flex items-center">
              <Link href="/" className="px-4 py-4 text-gray-700 hover:bg-gray-100 font-medium border-l border-gray-300">
                ホーム
              </Link>
              <Link href="/races" className="px-4 py-4 text-gray-700 hover:bg-gray-100 font-medium border-l border-gray-300">
                レース
              </Link>
              <Link href="/guide" className="px-4 py-4 text-gray-700 hover:bg-gray-100 font-medium border-l border-gray-300">
                使い方
              </Link>
              
              {status === 'loading' as any ? (
                <div className="px-4 py-4 border-l border-gray-300">
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : session ? (
                <>
                  <Link href="/mypage" className="px-4 py-4 text-gray-700 hover:bg-gray-100 font-medium border-l border-gray-300">
                    マイページ
                  </Link>
                  <Link href="/points/purchase" className="px-4 py-4 text-amber-600 hover:bg-amber-50 font-bold border-l border-gray-300">
                    ポイント購入
                  </Link>
                  {session.user?.isAdmin && (
                    <Link href="/admin" className="px-4 py-4 text-red-600 hover:bg-red-50 font-bold border-l border-gray-300">
                      管理者
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-4 text-gray-700 hover:bg-gray-100 font-medium border-l border-gray-300"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <Link 
                  href="/auth/login"
                  className="ml-4 bg-[#00B900] text-white px-4 py-2 rounded hover:bg-[#00A000] font-bold inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
                  </svg>
                  <span>ログイン</span>
                </Link>
              )}
            </nav>

            {/* モバイルメニューボタン */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* モバイルメニュー */}
          {isMenuOpen && (
            <nav className="md:hidden py-2 border-t">
              <Link 
                href="/"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                ホーム
              </Link>
              <Link 
                href="/races"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                レース
              </Link>
              <Link 
                href="/guide"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                使い方
              </Link>
              
              {session ? (
                <>
                  <div className="border-t my-2"></div>
                  <Link 
                    href="/mypage"
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    マイページ
                  </Link>
                  <Link 
                    href="/points/purchase"
                    className="block py-2 px-4 text-amber-600 hover:bg-amber-50 font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ポイント購入
                  </Link>
                  {session.user?.isAdmin && (
                    <Link 
                      href="/admin"
                      className="block py-2 px-4 text-red-600 hover:bg-red-50 font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      管理者
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <div className="border-t my-2 p-4">
                  <Link 
                    href="/auth/login"
                    className="bg-[#00B900] text-white px-4 py-2 rounded hover:bg-[#00A000] font-bold inline-flex items-center gap-2 w-full justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
                    </svg>
                    <span>ログイン</span>
                  </Link>
                </div>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* サブナビゲーション（ネット競馬風） */}
      <div className="bg-gray-200 border-b border-gray-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-xs">
            <Link href="/races?type=central" className="px-3 py-2 hover:bg-gray-300 border-r border-gray-300">
              中央競馬
            </Link>
            <Link href="/races?type=local" className="px-3 py-2 hover:bg-gray-300 border-r border-gray-300">
              地方競馬
            </Link>
            <Link href="/races?grade=g1" className="px-3 py-2 hover:bg-gray-300 border-r border-gray-300 text-red-600 font-bold">
              G1レース
            </Link>
            <Link href="/races?grade=g2g3" className="px-3 py-2 hover:bg-gray-300 border-r border-gray-300">
              G2・G3
            </Link>
            <Link href="/races?free=true" className="px-3 py-2 hover:bg-gray-300 text-green-600 font-bold">
              無料レース
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header