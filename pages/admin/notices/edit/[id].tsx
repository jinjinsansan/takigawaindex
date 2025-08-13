import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  Bell,
  Save,
  ChevronLeft,
  AlertCircle,
  Wrench,
  TrendingUp
} from 'lucide-react'
import { useSession } from '@/lib/auth-mock'
import { toast } from 'react-hot-toast'
import type { Notice } from '@/types'

const noticeTypeConfig = {
  campaign: {
    icon: TrendingUp,
    label: 'キャンペーン',
    description: 'ポイントプレゼントなどのキャンペーン情報'
  },
  maintenance: {
    icon: Wrench,
    label: 'メンテナンス',
    description: 'システムメンテナンスのお知らせ'
  },
  update: {
    icon: AlertCircle,
    label: 'アップデート',
    description: '機能追加や改善のお知らせ'
  }
}

// ダミーデータ取得（実際にはAPIから取得）
const fetchNotice = async (id: string): Promise<Notice | null> => {
  // ダミーレスポンス
  if (id === '1') {
    return {
      id: '1',
      title: '期間限定！新規登録で1000ポイントプレゼント',
      content: '今なら新規登録いただいた方全員に1000ポイントをプレゼント中です。この機会にぜひご登録ください。',
      type: 'campaign',
      isNew: true,
      isPublished: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    }
  }
  return null
}

export default function AdminNoticeEditPage() {
  const router = useRouter()
  const { id } = router.query
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'campaign' as Notice['type'],
    isNew: true,
    isPublished: false
  })

  useEffect(() => {
    if (status === 'loading' as any) return
    if (!session || !session.user?.isAdmin) {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchNotice(id).then(data => {
        if (data) {
          setFormData({
            title: data.title,
            content: data.content,
            type: data.type,
            isNew: data.isNew,
            isPublished: data.isPublished
          })
        }
        setLoading(false)
      })
    }
  }, [id])

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('タイトルを入力してください')
      return
    }
    if (!formData.content.trim()) {
      toast.error('内容を入力してください')
      return
    }

    setSaving(true)
    try {
      // APIコールの実装
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('お知らせを更新しました')
      router.push('/admin/notices')
    } catch (error) {
      toast.error('更新中にエラーが発生しました')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' as any || loading) {
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
          <h1 className="text-2xl font-bold flex items-center mb-4">
            <Bell className="w-6 h-6 mr-2 text-amber-600" />
            お知らせ編集
          </h1>
          <Link href="/admin/notices" className="inline-flex items-center text-gray-600 hover:text-gray-800">
            <ChevronLeft className="w-4 h-4 mr-1" />
            お知らせ管理に戻る
          </Link>
        </div>

        {/* フォーム */}
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <div className="space-y-6">
            {/* タイプ選択 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                お知らせタイプ
              </label>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(noticeTypeConfig).map(([key, config]) => {
                  const Icon = config.icon
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: key as Notice['type'] })}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.type === key
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                      <div className="font-medium">{config.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{config.description}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* タイトル */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="例：期間限定！新規登録で1000ポイントプレゼント"
              />
            </div>

            {/* 内容 */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="お知らせの詳細内容を入力してください"
              />
            </div>

            {/* オプション */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="rounded text-amber-600 mr-2"
                />
                <span className="text-sm font-medium">NEW表示を付ける</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="rounded text-amber-600 mr-2"
                />
                <span className="text-sm font-medium">公開する</span>
              </label>
            </div>

            {/* プレビュー */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">プレビュー</h3>
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${
                    formData.type === 'campaign' ? 'bg-green-100 text-green-800' :
                    formData.type === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {noticeTypeConfig[formData.type].label}
                  </div>
                  {formData.isNew && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      NEW
                    </span>
                  )}
                  {!formData.isPublished && (
                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-bold ml-2">
                      非公開
                    </span>
                  )}
                </div>
                <h4 className="font-bold mb-1">
                  {formData.title || 'タイトルが入ります'}
                </h4>
                <p className="text-sm text-gray-600">
                  {formData.content || '内容が入ります'}
                </p>
              </div>
            </div>
          </div>

          {/* ボタン */}
          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href="/admin/notices"
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              キャンセル
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                saving
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-500 text-white hover:bg-amber-600'
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? '更新中...' : '変更を保存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}