import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  Bell,
  Edit,
  Trash,
  Eye,
  EyeOff,
  Plus,
  ChevronLeft,
  Tag,
  AlertCircle,
  Wrench,
  TrendingUp
} from 'lucide-react'
import { useSession } from '@/lib/auth-mock'
import { toast } from 'react-hot-toast'
import type { Notice } from '@/types'

// ダミーデータ（実際にはAPIから取得）
const dummyNotices: Notice[] = [
  {
    id: '1',
    title: '期間限定！新規登録で1000ポイントプレゼント',
    content: '今なら新規登録いただいた方全員に1000ポイントをプレゼント中です。この機会にぜひご登録ください。',
    type: 'campaign',
    isNew: true,
    isPublished: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '2',
    title: 'システムメンテナンスのお知らせ',
    content: '1月20日（土）午前2時〜午前4時の間、システムメンテナンスを実施いたします。',
    type: 'maintenance',
    isNew: false,
    isPublished: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: '3',
    title: '瀧川指数の精度が向上しました',
    content: '最新のアルゴリズム更新により、瀧川指数の予測精度が向上しました。',
    type: 'update',
    isNew: true,
    isPublished: false,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  }
]

const noticeTypeConfig = {
  campaign: {
    icon: TrendingUp,
    label: 'キャンペーン',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-300'
  },
  maintenance: {
    icon: Wrench,
    label: 'メンテナンス',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-300'
  },
  update: {
    icon: AlertCircle,
    label: 'アップデート',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-300'
  }
}

export default function AdminNoticesPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [notices, setNotices] = useState<Notice[]>(dummyNotices)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (status === 'loading' as any) return
    if (!session || !session.user?.isAdmin) {
      router.push('/')
    }
  }, [session, status, router])

  const handleTogglePublish = async (noticeId: string) => {
    try {
      setNotices(notices.map(notice => 
        notice.id === noticeId ? { ...notice, isPublished: !notice.isPublished } : notice
      ))
      toast.success('公開状態を更新しました')
    } catch (error) {
      toast.error('エラーが発生しました')
    }
  }

  const handleToggleNew = async (noticeId: string) => {
    try {
      setNotices(notices.map(notice => 
        notice.id === noticeId ? { ...notice, isNew: !notice.isNew } : notice
      ))
      toast.success('NEW表示を更新しました')
    } catch (error) {
      toast.error('エラーが発生しました')
    }
  }

  const handleDelete = async (noticeId: string) => {
    if (!confirm('このお知らせを削除してもよろしいですか？')) return
    
    try {
      setNotices(notices.filter(notice => notice.id !== noticeId))
      toast.success('お知らせを削除しました')
    } catch (error) {
      toast.error('エラーが発生しました')
    }
  }

  const filteredNotices = filter 
    ? notices.filter(notice => notice.type === filter)
    : notices

  if (status === 'loading' as any) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (!session?.user?.isAdmin) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* ヘッダー */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center">
              <Bell className="w-6 h-6 mr-2 text-amber-600" />
              お知らせ管理
            </h1>
            <Link 
              href="/admin/notices/new"
              className="bg-amber-500 text-white font-bold py-2 px-4 rounded hover:bg-amber-600 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              新規追加
            </Link>
          </div>
          <Link href="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-800">
            <ChevronLeft className="w-4 h-4 mr-1" />
            管理者ダッシュボードに戻る
          </Link>
        </div>

        {/* フィルター */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-4">
            <Tag className="w-5 h-5 text-gray-600" />
            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">全てのタイプ</option>
              <option value="campaign">キャンペーン</option>
              <option value="maintenance">メンテナンス</option>
              <option value="update">アップデート</option>
            </select>
          </div>
        </div>

        {/* お知らせ一覧 */}
        <div className="space-y-4">
          {filteredNotices.map(notice => {
            const config = noticeTypeConfig[notice.type as keyof typeof noticeTypeConfig]
            const Icon = config.icon
            
            return (
              <div key={notice.id} className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-full text-sm font-medium flex items-center mr-3`}>
                        <Icon className="w-4 h-4 mr-1" />
                        {config.label}
                      </div>
                      {notice.isNew && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          NEW
                        </span>
                      )}
                      {!notice.isPublished && (
                        <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-bold ml-2">
                          非公開
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{notice.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{notice.content}</p>
                    <p className="text-xs text-gray-500">
                      作成日: {new Date(notice.createdAt).toLocaleDateString('ja-JP')} / 
                      更新日: {new Date(notice.updatedAt).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleToggleNew(notice.id)}
                      className={`p-2 rounded ${
                        notice.isNew 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                      title="NEW表示の切り替え"
                    >
                      <Tag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleTogglePublish(notice.id)}
                      className={`p-2 rounded ${
                        notice.isPublished 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                      title="公開/非公開の切り替え"
                    >
                      {notice.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <Link
                      href={`/admin/notices/edit/${notice.id}`}
                      className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                      title="編集"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                      title="削除"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredNotices.length === 0 && (
          <div className="bg-white border border-gray-300 rounded-lg p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">お知らせがありません</p>
          </div>
        )}
      </div>
    </div>
  )
}