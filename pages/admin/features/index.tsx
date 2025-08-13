import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  Star,
  Edit,
  Trash,
  Eye,
  EyeOff,
  Plus,
  ChevronLeft,
  ArrowUp,
  ArrowDown,
  Trophy,
  TrendingUp,
  Users,
  Shield,
  Target,
  Zap,
  AlertCircle
} from 'lucide-react'
import { useSession } from '@/lib/auth-mock'
import { toast } from 'react-hot-toast'
import type { Feature } from '@/types'

// ダミーデータ（実際にはAPIから取得）
const dummyFeatures: Feature[] = [
  {
    id: '1',
    icon: 'Trophy',
    title: '元ジョッキーの知見',
    description: '瀧川寿樹也氏の現場経験に基づく分析',
    order: 1,
    isPublished: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    icon: 'TrendingUp',
    title: '独自の指数算出',
    description: '統計データと経験則を融合した予想',
    order: 2,
    isPublished: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    icon: 'Users',
    title: '会員限定情報',
    description: '詳細な分析レポートを毎日更新',
    order: 3,
    isPublished: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '4',
    icon: 'Shield',
    title: '信頼性の高い予想',
    description: '過去の実績に基づく確かな情報',
    order: 4,
    isPublished: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

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

export default function AdminFeaturesPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [features, setFeatures] = useState<Feature[]>(dummyFeatures)

  useEffect(() => {
    if (status === 'loading' as any) return
    if (!session || !session.user?.isAdmin) {
      router.push('/')
    }
  }, [session, status, router])

  const handleTogglePublish = async (featureId: string) => {
    try {
      setFeatures(features.map(feature => 
        feature.id === featureId ? { ...feature, isPublished: !feature.isPublished } : feature
      ))
      toast.success('公開状態を更新しました')
    } catch (error) {
      toast.error('エラーが発生しました')
    }
  }

  const handleMoveUp = async (featureId: string) => {
    const index = features.findIndex(f => f.id === featureId)
    if (index <= 0) return

    const newFeatures = [...features]
    const temp = newFeatures[index]
    newFeatures[index] = newFeatures[index - 1]
    newFeatures[index - 1] = temp

    // 順序を更新
    newFeatures.forEach((f, i) => {
      f.order = i + 1
    })

    setFeatures(newFeatures)
    toast.success('順序を更新しました')
  }

  const handleMoveDown = async (featureId: string) => {
    const index = features.findIndex(f => f.id === featureId)
    if (index < 0 || index >= features.length - 1) return

    const newFeatures = [...features]
    const temp = newFeatures[index]
    newFeatures[index] = newFeatures[index + 1]
    newFeatures[index + 1] = temp

    // 順序を更新
    newFeatures.forEach((f, i) => {
      f.order = i + 1
    })

    setFeatures(newFeatures)
    toast.success('順序を更新しました')
  }

  const handleDelete = async (featureId: string) => {
    if (!confirm('この特徴を削除してもよろしいですか？')) return
    
    try {
      setFeatures(features.filter(feature => feature.id !== featureId))
      toast.success('特徴を削除しました')
    } catch (error) {
      toast.error('エラーが発生しました')
    }
  }

  const getIconComponent = (iconName: string) => {
    const iconData = availableIcons.find(i => i.name === iconName)
    return iconData ? iconData.icon : Star
  }

  if (status === 'loading' as any) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (!session?.user?.isAdmin) return null

  const sortedFeatures = [...features].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* ヘッダー */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center">
              <Star className="w-6 h-6 mr-2 text-amber-600" />
              瀧川指数特徴管理
            </h1>
            <Link 
              href="/admin/features/new"
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

        {/* 特徴一覧 */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-4">順序</th>
                <th className="text-left p-4">アイコン</th>
                <th className="text-left p-4">タイトル</th>
                <th className="text-left p-4">説明</th>
                <th className="text-center p-4">公開</th>
                <th className="text-center p-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {sortedFeatures.map((feature, index) => {
                const IconComponent = getIconComponent(feature.icon)
                
                return (
                  <tr key={feature.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-gray-700">{feature.order}</span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => handleMoveUp(feature.id)}
                            disabled={index === 0}
                            className={`p-1 rounded ${
                              index === 0 
                                ? 'text-gray-300 cursor-not-allowed' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleMoveDown(feature.id)}
                            disabled={index === sortedFeatures.length - 1}
                            className={`p-1 rounded ${
                              index === sortedFeatures.length - 1
                                ? 'text-gray-300 cursor-not-allowed' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="bg-amber-100 p-2 rounded inline-block">
                        <IconComponent className="w-5 h-5 text-amber-600" />
                      </div>
                    </td>
                    <td className="p-4 font-medium">{feature.title}</td>
                    <td className="p-4 text-sm text-gray-600">{feature.description}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(feature.id)}
                        className={`p-2 rounded ${
                          feature.isPublished 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {feature.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          href={`/admin/features/edit/${feature.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(feature.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">表示について</p>
              <p>トップページには公開設定されている特徴のみが表示順に表示されます。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}