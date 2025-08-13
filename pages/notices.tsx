import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell, ChevronLeft, TrendingUp, Wrench, AlertCircle } from 'lucide-react'
import type { Notice } from '@/types'

// ダミーデータ（実際にはAPIから取得）
const fetchNotices = async (): Promise<Notice[]> => {
  return [
    {
      id: '1',
      title: '期間限定！新規登録で1000ポイントプレゼント',
      content: '今なら新規登録いただいた方全員に1000ポイントをプレゼント中です。この機会にぜひご登録ください。',
      type: 'campaign',
      isNew: true,
      isPublished: true,
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13'
    },
    {
      id: '2',
      title: 'サービスメンテナンスのお知らせ（1/15 2:00-5:00）',
      content: '1月15日の午前2時〜5時にメンテナンスを実施します。この間、サービスをご利用いただけません。',
      type: 'maintenance',
      isNew: false,
      isPublished: true,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      title: '有馬記念の瀧川指数公開！今年の有力馬を徹底分析',
      content: '注目の有馬記念について、瀧川指数による詳細分析を公開しました。会員の方はぜひご覧ください。',
      type: 'update',
      isNew: false,
      isPublished: true,
      createdAt: '2024-01-11',
      updatedAt: '2024-01-11'
    },
    {
      id: '4',
      title: '新機能追加のお知らせ',
      content: 'レース検索機能を追加しました。過去のレース結果から瀧川指数を確認できます。',
      type: 'update',
      isNew: false,
      isPublished: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    },
    {
      id: '5',
      title: 'ポイント2倍キャンペーン実施中',
      content: '期間限定でポイント購入時に2倍のポイントが付与されます。この機会をお見逃しなく！',
      type: 'campaign',
      isNew: false,
      isPublished: true,
      createdAt: '2024-01-09',
      updatedAt: '2024-01-09'
    }
  ]
}

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

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [filter, setFilter] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotices().then(data => {
      setNotices(data)
      setLoading(false)
    })
  }, [])

  const filteredNotices = filter
    ? notices.filter(notice => notice.type === filter)
    : notices

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* ヘッダー */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold flex items-center mb-4">
            <Bell className="w-6 h-6 mr-2 text-amber-600" />
            お知らせ一覧
          </h1>
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800">
            <ChevronLeft className="w-4 h-4 mr-1" />
            トップページに戻る
          </Link>
        </div>

        {/* フィルター */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setFilter('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                filter === ''
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setFilter('campaign')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                filter === 'campaign'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              キャンペーン
            </button>
            <button
              onClick={() => setFilter('maintenance')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                filter === 'maintenance'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              メンテナンス
            </button>
            <button
              onClick={() => setFilter('update')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                filter === 'update'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              アップデート
            </button>
          </div>
        </div>

        {/* お知らせリスト */}
        <div className="space-y-4">
          {filteredNotices.map(notice => {
            const config = noticeTypeConfig[notice.type as keyof typeof noticeTypeConfig]
            const Icon = config.icon

            return (
              <div key={notice.id} className="bg-white border border-gray-300 rounded-lg p-6">
                <div className="flex items-start">
                  <div className={`${config.bgColor} p-2 rounded-lg mr-4 flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-full text-xs font-medium`}>
                        {config.label}
                      </span>
                      {notice.isNew && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold ml-2">
                          NEW
                        </span>
                      )}
                      <span className="text-xs text-gray-500 ml-auto">
                        {new Date(notice.createdAt).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold mb-2">{notice.title}</h2>
                    <p className="text-gray-600">{notice.content}</p>
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