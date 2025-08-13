import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLineLogin = async () => {
    setIsLoading(true)
    try {
      // 開発環境では直接ホームにリダイレクト
      toast.success('ログインしました（開発モード）')
      router.push('/')
      
      // 本番環境では以下のようなLINEログイン処理を実装
      // await signIn('line', { callbackUrl: '/' })
    } catch (error) {
      toast.error('ログインに失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center">
            <div className="flex items-center">
              <div className="mr-3">
                <svg className="w-10 h-10 text-amber-600" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12L7 16L13 10L17 14L21 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="7" cy="16" r="2" fill="currentColor"/>
                  <circle cx="13" cy="10" r="2" fill="currentColor"/>
                  <circle cx="17" cy="14" r="2" fill="currentColor"/>
                  <circle cx="21" cy="10" r="2" fill="currentColor"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-gray-800 font-black text-2xl leading-none">
                  瀧川指数
                </div>
                <div className="text-amber-600 text-xs font-bold tracking-wider">
                  TAKIGAWA INDEX
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* ログインカード */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>

          {/* 特典案内 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-800 mb-1">LINE友達追加特典</p>
                <p className="text-sm text-green-700">
                  今なら新規登録＆友達追加で500ポイントプレゼント！
                </p>
              </div>
            </div>
          </div>

          {/* LINEログインボタン */}
          <button
            onClick={handleLineLogin}
            disabled={isLoading}
            className={`w-full bg-[#00B900] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#00A000] transition-colors flex items-center justify-center ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                処理中...
              </span>
            ) : (
              <>
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
                </svg>
                LINEでログイン
              </>
            )}
          </button>

          {/* 注意事項 */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600 mb-2">
              ログインすることで、
              <Link href="/terms" className="text-blue-600 hover:underline">利用規約</Link>
              と
              <Link href="/privacy" className="text-blue-600 hover:underline">プライバシーポリシー</Link>
              に同意したものとみなされます
            </p>
          </div>
        </div>

        {/* その他の情報 */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-bold mb-4">瀧川指数でできること</h2>
            <div className="space-y-3 text-sm text-left">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-amber-600 font-bold">1</span>
                </div>
                <p>元地方競馬ジョッキー監修の精度の高い予想を閲覧</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-amber-600 font-bold">2</span>
                </div>
                <p>独自の指数による各馬の期待値を数値で確認</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-amber-600 font-bold">3</span>
                </div>
                <p>中央・地方競馬の主要レースを毎日カバー</p>
              </div>
            </div>
          </div>
        </div>

        {/* ホームに戻る */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-800 text-sm">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}