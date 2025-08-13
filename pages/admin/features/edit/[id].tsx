import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  Star,
  Save,
  ChevronLeft,
  Trophy,
  TrendingUp,
  Users,
  Shield,
  Target,
  Zap
} from 'lucide-react'
import { useSession } from '@/lib/auth-mock'
import { toast } from 'react-hot-toast'
import type { Feature } from '@/types'

// 利用可能なアイコン
const availableIcons = [
  { name: 'Trophy', icon: Trophy, label: 'トロフィー' },
  { name: 'TrendingUp', icon: TrendingUp, label: '上昇トレンド' },
  { name: 'Users', icon: Users, label: 'ユーザー' },
  { name: 'Shield', icon: Shield, label: 'シールド' },
  { name: 'Target', icon: Target, label: 'ターゲット' },
  { name: 'Zap', icon: Zap, label: '稲妻' },
  { name: 'Star', icon: Star, label: 'スター' }
]

// ダミーデータ取得（実際にはAPIから取得）
const fetchFeature = async (id: string): Promise<Feature | null> => {
  // ダミーレスポンス
  if (id === '1') {
    return {
      id: '1',
      icon: 'Trophy',
      title: '元ジョッキーの知見',
      description: '瀧川寿樹也氏の現場経験に基づく分析',
      order: 1,
      isPublished: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  }
  return null
}

export default function AdminFeatureEditPage() {
  const router = useRouter()
  const { id } = router.query
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    icon: 'Trophy',
    title: '',
    description: '',
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
      fetchFeature(id).then(data => {
        if (data) {
          setFormData({
            icon: data.icon,
            title: data.title,
            description: data.description,
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
    if (!formData.description.trim()) {
      toast.error('説明を入力してください')
      return
    }

    setSaving(true)
    try {
      // APIコールの実装
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('特徴を更新しました')
      router.push('/admin/features')
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
            <Star className="w-6 h-6 mr-2 text-amber-600" />
            特徴編集
          </h1>
          <Link href="/admin/features" className="inline-flex items-center text-gray-600 hover:text-gray-800">
            <ChevronLeft className="w-4 h-4 mr-1" />
            特徴管理に戻る
          </Link>
        </div>

        {/* フォーム */}
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <div className="space-y-6">
            {/* アイコン選択 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                アイコン
              </label>
              <div className="grid grid-cols-4 gap-3">
                {availableIcons.map(({ name, icon: IconComponent, label }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: name })}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      formData.icon === name
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <IconComponent className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                    <div className="text-xs">{label}</div>
                  </button>
                ))}
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
                placeholder="例：元ジョッキーの知見"
              />
            </div>

            {/* 説明 */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                説明 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="特徴の詳細説明を入力してください"
              />
            </div>

            {/* オプション */}
            <div>
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
                <div className="flex items-start">
                  <div className="bg-amber-100 p-2 rounded mr-3">
                    {(() => {
                      const IconComponent = availableIcons.find(i => i.name === formData.icon)?.icon || Star
                      return <IconComponent className="w-5 h-5 text-amber-600" />
                    })()}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">
                      {formData.title || 'タイトルが入ります'}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {formData.description || '説明が入ります'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ボタン */}
          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href="/admin/features"
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