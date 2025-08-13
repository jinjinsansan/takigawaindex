import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Bell, 
  FileText, 
  Settings,
  TrendingUp,
  Upload,
  Eye
} from 'lucide-react'
import { useSession } from '@/lib/auth-mock' // 本番時はnext-auth/reactに変更

// ダミー統計データ
const stats = {
  totalUsers: 156,
  activeUsers: 42,
  todayRaces: 8,
  totalRaces: 234,
  notices: 3,
  revenue: 125000
}

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // 認証チェック
    if (status === 'loading' as any) return
    if (!session || !session.user?.isAdmin) {
      router.push('/')
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

  if (!session?.user?.isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* ページタイトル */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <LayoutDashboard className="w-6 h-6 mr-2 text-amber-600" />
            管理者ダッシュボード
          </h1>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">総ユーザー数</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">本日のレース数</p>
                <p className="text-2xl font-bold">{stats.todayRaces}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">月間売上</p>
                <p className="text-2xl font-bold">¥{stats.revenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-amber-600" />
            </div>
          </div>
        </div>

        {/* 管理メニュー */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* レース管理 */}
          <Link href="/admin/races" className="group">
            <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 rounded-lg p-3 mr-3">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-lg font-bold">レース管理</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                レース情報の登録・編集・削除、カテゴリ設定、表示管理
              </p>
              <div className="flex items-center text-amber-600 group-hover:text-amber-700">
                <span className="text-sm font-medium">管理画面へ</span>
                <Eye className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          {/* OCR/テキスト入力 */}
          <Link href="/admin/races/input" className="group">
            <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-3">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold">レース入力</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                OCR機能による画像からの自動入力、テキスト解析機能
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                <span className="text-sm font-medium">入力画面へ</span>
                <Eye className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          {/* お知らせ管理 */}
          <Link href="/admin/notices" className="group">
            <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 rounded-lg p-3 mr-3">
                  <Bell className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-lg font-bold">お知らせ管理</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                お知らせ・キャンペーン情報の作成・編集・公開管理
              </p>
              <div className="flex items-center text-red-600 group-hover:text-red-700">
                <span className="text-sm font-medium">管理画面へ</span>
                <Eye className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          {/* ユーザー管理 */}
          <Link href="/admin/users" className="group">
            <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-lg p-3 mr-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-lg font-bold">ユーザー管理</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                ユーザー情報の確認、ポイント管理、利用統計
              </p>
              <div className="flex items-center text-green-600 group-hover:text-green-700">
                <span className="text-sm font-medium">管理画面へ</span>
                <Eye className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          {/* 特徴セクション管理 */}
          <Link href="/admin/features" className="group">
            <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-lg p-3 mr-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold">特徴セクション</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                トップページの瀧川指数特徴セクションの編集
              </p>
              <div className="flex items-center text-purple-600 group-hover:text-purple-700">
                <span className="text-sm font-medium">管理画面へ</span>
                <Eye className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          {/* システム設定 */}
          <Link href="/admin/settings" className="group">
            <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-lg p-3 mr-3">
                  <Settings className="w-6 h-6 text-gray-600" />
                </div>
                <h2 className="text-lg font-bold">システム設定</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                サイト全体の設定、ポイント設定、その他の管理
              </p>
              <div className="flex items-center text-gray-600 group-hover:text-gray-700">
                <span className="text-sm font-medium">設定画面へ</span>
                <Eye className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* 最近のアクティビティ */}
        <div className="bg-white border border-gray-300 rounded-lg mt-6">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
            <h2 className="text-lg font-bold">最近のアクティビティ</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-600">2024-01-13 15:30</span>
                <span className="mx-2">-</span>
                <span>新規ユーザー登録: user156</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-600">2024-01-13 14:45</span>
                <span className="mx-2">-</span>
                <span>レース追加: 有馬記念</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                <span className="text-gray-600">2024-01-13 13:20</span>
                <span className="mx-2">-</span>
                <span>ポイント購入: 3000pt (user123)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}