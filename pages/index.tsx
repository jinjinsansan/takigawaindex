import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Trophy, TrendingUp, ChevronRight, AlertCircle, Star, Users, FileText } from 'lucide-react'
import type { Race, Notice, Feature } from '@/types'

// ダミーデータ取得（実際にはAPIから取得）
const fetchTopPageData = async () => {
  // 管理画面で設定されたレースを取得
  const topRaces: Race[] = [
    {
      id: '1',
      venue: '中山',
      raceNumber: 11,
      raceName: '有馬記念',
      postTime: '15:25',
      gradeClass: 'G1',
      raceType: '芝',
      distance: 2500,
      noteUrl: 'https://note.com/takigawa/n/xxx',
      isFree: false,
      pointCost: 500,
      raceDate: '2024-01-13',
      category: 'g1',
      isPublished: true,
      showOnTop: true,
      topOrder: 1,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      horsesCount: 16
    },
    {
      id: '2',
      venue: '阪神',
      raceNumber: 11,
      raceName: '阪神カップ',
      postTime: '15:35',
      gradeClass: 'G2',
      raceType: '芝',
      distance: 1400,
      isFree: false,
      pointCost: 500,
      raceDate: '2024-01-13',
      category: 'g2g3',
      isPublished: true,
      showOnTop: true,
      topOrder: 2,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      horsesCount: 18
    },
    {
      id: '3',
      venue: '中山',
      raceNumber: 10,
      raceName: 'ディセンバーS',
      postTime: '14:50',
      gradeClass: 'OP',
      raceType: 'ダ',
      distance: 1800,
      isFree: true,
      pointCost: 0,
      raceDate: '2024-01-13',
      category: 'free',
      isPublished: true,
      showOnTop: true,
      topOrder: 3,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      horsesCount: 16
    }
  ]

  // お知らせを取得
  const notices: Notice[] = [
    {
      id: '1',
      title: '期間限定！新規登録で1000ポイントプレゼント',
      content: '今なら新規登録いただいた方全員に1000ポイントをプレゼント中です。',
      type: 'campaign',
      isNew: true,
      isPublished: true,
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13'
    },
    {
      id: '2',
      title: 'サービスメンテナンスのお知らせ（1/15 2:00-5:00）',
      content: '1月15日の午前2時〜5時にメンテナンスを実施します。',
      type: 'maintenance',
      isNew: false,
      isPublished: true,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      title: '有馬記念の瀧川指数公開！今年の有力馬を徹底分析',
      content: '注目の有馬記念について、瀧川指数による詳細分析を公開しました。',
      type: 'update',
      isNew: false,
      isPublished: true,
      createdAt: '2024-01-11',
      updatedAt: '2024-01-11'
    }
  ]

  // 特徴セクションを取得
  const features: Feature[] = [
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
    }
  ]

  return { topRaces, notices, features }
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [topRaces, setTopRaces] = useState<Race[]>([])
  const [notices, setNotices] = useState<Notice[]>([])
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopPageData().then(({ topRaces, notices, features }) => {
      // topOrderでソート
      const sortedRaces = topRaces.sort((a, b) => (a.topOrder || 999) - (b.topOrder || 999))
      setTopRaces(sortedRaces)
      setNotices(notices)
      setFeatures(features.sort((a, b) => a.order - b.order))
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'G1': return 'text-red-600 font-bold'
      case 'G2': return 'text-blue-600 font-bold'
      case 'G3': return 'text-green-600 font-bold'
      case 'OP': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  const getRaceTypeColor = (type: string) => {
    return type === '芝' ? 'text-green-700' : 'text-orange-700'
  }

  // 日付ごとにレースをグループ化
  const groupRacesByDate = (races: Race[]) => {
    const today = new Date().toLocaleDateString('ja-JP')
    const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('ja-JP')
    
    const todayRaces = races.filter(race => 
      new Date(race.raceDate).toLocaleDateString('ja-JP') === today
    )
    const tomorrowRaces = races.filter(race => 
      new Date(race.raceDate).toLocaleDateString('ja-JP') === tomorrow
    )
    const otherRaces = races.filter(race => {
      const raceDate = new Date(race.raceDate).toLocaleDateString('ja-JP')
      return raceDate !== today && raceDate !== tomorrow
    })
    
    return { todayRaces, tomorrowRaces, otherRaces }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  const { todayRaces, tomorrowRaces, otherRaces } = groupRacesByDate(topRaces)

  return (
    <div className="min-h-screen">
      {/* メインコンテナ */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* メインコンテンツ（左側） */}
          <div className="lg:col-span-2">
            {/* お知らせ（ネット競馬風） */}
            <div className="bg-white border border-gray-300 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 text-sm font-bold">
                <AlertCircle className="inline w-4 h-4 mr-1" />
                お知らせ・キャンペーン
              </div>
              <div className="p-3">
                {notices.map(notice => (
                  <div key={notice.id} className="flex items-start py-2 border-b border-gray-200 last:border-0">
                    <span className="text-xs text-gray-500 mr-3 whitespace-nowrap">{notice.createdAt ? new Date(notice.createdAt).toLocaleDateString('ja-JP') : ''}</span>
                    {notice.isNew && (
                      <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded mr-2">NEW</span>
                    )}
                    <Link href="#" className="text-sm hover:text-blue-600 hover:underline flex-1">
                      {notice.title}
                    </Link>
                  </div>
                ))}
                <div className="text-right mt-2">
                  <Link href="/notices" className="text-xs text-blue-600 hover:underline">
                    すべてのお知らせを見る →
                  </Link>
                </div>
              </div>
            </div>

            {/* 本日のレース（ネット競馬風テーブル） */}
            <div className="bg-white border border-gray-300 mb-4">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 text-sm font-bold flex items-center justify-between">
                <span>
                  <Calendar className="inline w-4 h-4 mr-1" />
                  本日のレース（{currentTime.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' })}）
                </span>
                <Link href="/races" className="text-xs hover:underline">
                  すべて見る →
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">時刻</th>
                      <th className="text-left">競馬場</th>
                      <th className="text-left">R</th>
                      <th className="text-left">レース名</th>
                      <th className="text-center">条件</th>
                      <th className="text-center">頭数</th>
                      <th className="text-center">指数</th>
                      <th className="text-center">ポイント</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayRaces.map(race => (
                      <tr key={race.id} className="hover:bg-gray-50">
                        <td className="text-sm">{race.postTime}</td>
                        <td className="text-sm">{race.venue}</td>
                        <td className="text-sm font-bold">{race.raceNumber}R</td>
                        <td className="text-sm">
                          <Link href={`/races/${race.id}`} className="hover:text-blue-600 hover:underline">
                            <span className={getGradeColor(race.gradeClass || '')}>{race.gradeClass}</span>
                            {' '}{race.raceName}
                          </Link>
                          {race.noteUrl && (
                            <FileText className="inline w-3 h-3 ml-1 text-blue-600" />
                          )}
                        </td>
                        <td className="text-sm text-center">
                          <span className={getRaceTypeColor(race.raceType)}>{race.raceType}</span>
                          {race.distance}m
                        </td>
                        <td className="text-sm text-center">{race.horsesCount}</td>
                        <td className="text-center">
                          <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded">有</span>
                        </td>
                        <td className="text-sm text-center">
                          {race.isFree ? (
                            <span className="text-green-600 font-bold">無料</span>
                          ) : (
                            <span className="text-gray-700">{race.pointCost}pt</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 明日のレース */}
            <div className="bg-white border border-gray-300 mb-4">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-2 text-sm font-bold">
                <Calendar className="inline w-4 h-4 mr-1" />
                明日のレース
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {tomorrowRaces.map(race => (
                      <tr key={race.id} className="hover:bg-gray-50">
                        <td className="text-sm">{race.postTime}</td>
                        <td className="text-sm">{race.venue}</td>
                        <td className="text-sm font-bold">{race.raceNumber}R</td>
                        <td className="text-sm">
                          <Link href={`/races/${race.id}`} className="hover:text-blue-600 hover:underline">
                            <span className={getGradeColor(race.gradeClass || '')}>{race.gradeClass}</span>
                            {' '}{race.raceName}
                          </Link>
                          {race.noteUrl && (
                            <FileText className="inline w-3 h-3 ml-1 text-blue-600" />
                          )}
                        </td>
                        <td className="text-sm text-center">
                          <span className={getRaceTypeColor(race.raceType)}>{race.raceType}</span>
                          {race.distance}m
                        </td>
                        <td className="text-sm text-center">{race.horsesCount}</td>
                        <td className="text-center">
                          <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded">有</span>
                        </td>
                        <td className="text-sm text-center">{race.pointCost}pt</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* サイドバー（右側） */}
          <div className="lg:col-span-1">
            {/* LINE友達追加プロモーション */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded mb-4">
              <h3 className="font-bold text-lg mb-2">LINE友達限定特典！</h3>
              <p className="text-sm mb-3">今なら友達追加で500ポイントプレゼント</p>
              <Link 
                href="/auth/login"
                className="bg-white text-green-600 font-bold py-2 px-4 rounded hover:bg-gray-100 inline-flex items-center gap-2 w-full justify-center"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
                </svg>
                友達追加で始める
              </Link>
            </div>

            {/* 瀧川指数の特徴 */}
            <div className="bg-white border border-gray-300 mb-4">
              <div className="bg-gray-700 text-white px-3 py-2 text-sm font-bold">
                <Star className="inline w-4 h-4 mr-1" />
                瀧川指数の特徴
              </div>
              <div className="p-3 space-y-3">
                {features.map(feature => {
                  // アイコン名からアイコンコンポーネントを選択
                  const IconComponent = 
                    feature.icon === 'Trophy' ? Trophy :
                    feature.icon === 'TrendingUp' ? TrendingUp :
                    feature.icon === 'Users' ? Users :
                    Star // デフォルト
                  
                  return (
                    <div key={feature.id} className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded mr-3">
                        <IconComponent className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ポイント購入案内 */}
            <div className="bg-white border border-gray-300 mb-4">
              <div className="bg-amber-600 text-white px-3 py-2 text-sm font-bold">
                ポイント購入
              </div>
              <div className="p-3">
                <p className="text-sm mb-3">レース予想を見るにはポイントが必要です</p>
                <Link 
                  href="/points/purchase"
                  className="bg-amber-500 text-white font-bold py-2 px-4 rounded hover:bg-amber-600 inline-flex items-center justify-center w-full"
                >
                  ポイントを購入する
                </Link>
                <p className="text-xs text-gray-600 mt-2 text-center">1ポイント = 1円</p>
              </div>
            </div>

            {/* リンク集 */}
            <div className="bg-white border border-gray-300">
              <div className="bg-gray-700 text-white px-3 py-2 text-sm font-bold">
                関連リンク
              </div>
              <div className="p-3 space-y-2">
                <Link href="/guide" className="block text-sm text-blue-600 hover:underline">
                  → 使い方ガイド
                </Link>
                <Link href="/terms" className="block text-sm text-blue-600 hover:underline">
                  → 利用規約
                </Link>
                <Link href="/commercial" className="block text-sm text-blue-600 hover:underline">
                  → 特定商取引法に基づく表記
                </Link>
                <a href="https://note.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-600 hover:underline">
                  → 瀧川寿樹也のNOTE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}