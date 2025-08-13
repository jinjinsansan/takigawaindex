import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { User, CreditCard, History, Settings, TrendingUp, Calendar, Award } from 'lucide-react'
import { useSession } from '@/lib/auth-mock' // 本番時はnext-auth/reactに変更

// ダミーデータ（実際にはAPIから取得）
const viewHistory = [
  {
    id: '1',
    raceName: '有馬記念',
    venue: '中山',
    raceDate: '2024-01-13',
    viewedAt: '2024-01-13 14:30',
    pointsUsed: 500
  },
  {
    id: '2',
    raceName: '阪神カップ',
    venue: '阪神',
    raceDate: '2024-01-13',
    viewedAt: '2024-01-13 13:45',
    pointsUsed: 500
  }
]

const stats = {
  totalViews: 12,
  thisMonthViews: 5,
  totalPointsUsed: 6000,
  memberSince: '2024-01-01'
}

export default function MyPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // 認証チェック
    if (status === 'loading' as any) return
    if (!session) {
      router.push('/auth/login')
    }
  }, [session, status, router])

  if (status === 'loading' as any) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* ユーザー情報カード */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold flex items-center">
              <User className="w-6 h-6 mr-2 text-amber-600" />
              マイページ
            </h1>
            <Link 
              href="/settings" 
              className="text-gray-600 hover:text-gray-800"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* プロフィール情報 */}
            <div>
              <h2 className="font-bold mb-3 text-gray-700">プロフィール</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">ユーザー名</span>
                  <span className="font-medium">{session.user?.name || 'ゲスト'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">メールアドレス</span>
                  <span className="font-medium">{session.user?.email || '未設定'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">会員登録日</span>
                  <span className="font-medium">{stats.memberSince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">LINE連携</span>
                  <span className="font-medium text-green-600">
                    {session.user?.isLineFriend ? '連携済み' : '未連携'}
                  </span>
                </div>
              </div>
            </div>

            {/* ポイント情報 */}
            <div>
              <h2 className="font-bold mb-3 text-gray-700">ポイント情報</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">現在の保有ポイント</p>
                  <p className="text-3xl font-bold text-amber-600">
                    {session.user?.points?.toLocaleString() || 0}
                    <span className="text-lg">pt</span>
                  </p>
                </div>
                <Link 
                  href="/points/purchase"
                  className="bg-amber-500 text-white font-bold py-2 px-4 rounded hover:bg-amber-600 w-full text-center block"
                >
                  ポイントを購入する
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 利用統計 */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-amber-600" />
            利用統計
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{stats.totalViews}</p>
              <p className="text-sm text-gray-600">総閲覧数</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{stats.thisMonthViews}</p>
              <p className="text-sm text-gray-600">今月の閲覧数</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{stats.totalPointsUsed}</p>
              <p className="text-sm text-gray-600">使用ポイント</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalViews > 0 ? Math.round(stats.totalPointsUsed / stats.totalViews) : 0}
              </p>
              <p className="text-sm text-gray-600">平均使用pt</p>
            </div>
          </div>
        </div>

        {/* 閲覧履歴 */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
            <h2 className="text-xl font-bold flex items-center">
              <History className="w-5 h-5 mr-2" />
              最近の閲覧履歴
            </h2>
          </div>
          
          {viewHistory.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              まだ閲覧履歴がありません
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">閲覧日時</th>
                    <th className="text-left">開催日</th>
                    <th className="text-left">競馬場</th>
                    <th className="text-left">レース名</th>
                    <th className="text-center">使用ポイント</th>
                    <th className="text-center">詳細</th>
                  </tr>
                </thead>
                <tbody>
                  {viewHistory.map(history => (
                    <tr key={history.id} className="hover:bg-gray-50">
                      <td className="text-sm">{history.viewedAt}</td>
                      <td className="text-sm">{history.raceDate}</td>
                      <td className="text-sm">{history.venue}</td>
                      <td className="text-sm font-medium">{history.raceName}</td>
                      <td className="text-sm text-center">{history.pointsUsed}pt</td>
                      <td className="text-center">
                        <Link 
                          href={`/races/${history.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          再度見る
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}