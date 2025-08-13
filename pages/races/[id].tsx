import { useRouter } from 'next/router'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Trophy, ChevronLeft, Lock, TrendingUp } from 'lucide-react'
import { useSession } from '@/lib/auth-mock' // 本番時はnext-auth/reactに変更
import { toast } from 'react-hot-toast'
import { useState } from 'react'

// ダミーデータ（実際にはAPIから取得）
const raceData = {
  id: '1',
  venue: '中山',
  raceNumber: 11,
  raceName: '有馬記念',
  postTime: '15:25',
  gradeClass: 'G1',
  raceType: '芝',
  distance: 2500,
  horsesCount: 16,
  noteUrl: 'https://note.com/takigawa/n/xxx',
  isFree: false,
  pointCost: 500,
  raceDate: '2024-01-13',
  weather: '晴',
  trackCondition: '良',
  prizeFirst: 50000000,
  horses: [
    { horseNumber: 1, horseName: 'エクセレントホース', age: 4, sex: '牡', weight: 480, jockey: '山田騎手', trainer: '佐藤調教師', odds: 2.5, popularity: 1, takigawaIndex: 95.5 },
    { horseNumber: 2, horseName: 'ウィニングラン', age: 5, sex: '牝', weight: 460, jockey: '田中騎手', trainer: '鈴木調教師', odds: 5.2, popularity: 2, takigawaIndex: 88.3 },
    { horseNumber: 3, horseName: 'ゴールドラッシュ', age: 4, sex: '牡', weight: 490, jockey: '佐藤騎手', trainer: '山田調教師', odds: 8.7, popularity: 3, takigawaIndex: 82.1 },
  ]
}

export default function RaceDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()
  const [hasAccess, setHasAccess] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)

  const unlockRace = async () => {
    if (!session) {
      router.push('/auth/login')
      return
    }

    if ((session.user?.points || 0) < raceData.pointCost) {
      toast.error('ポイントが不足しています')
      router.push('/points/purchase')
      return
    }

    setIsUnlocking(true)
    try {
      // ここでAPIを呼んでポイントを消費
      await new Promise(resolve => setTimeout(resolve, 1000)) // ダミー処理
      setHasAccess(true)
      toast.success(`${raceData.pointCost}ポイントを使用しました`)
    } catch (error) {
      toast.error('エラーが発生しました')
    } finally {
      setIsUnlocking(false)
    }
  }

  const canViewDetails = raceData.isFree || hasAccess

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* 戻るボタン */}
        <Link href="/races" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          レース一覧に戻る
        </Link>

        {/* レース基本情報 */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                <span className={`inline-block px-2 py-1 rounded text-white text-sm mr-2 ${
                  raceData.gradeClass === 'G1' ? 'bg-red-600' :
                  raceData.gradeClass === 'G2' ? 'bg-blue-600' :
                  raceData.gradeClass === 'G3' ? 'bg-green-600' :
                  'bg-purple-600'
                }`}>
                  {raceData.gradeClass}
                </span>
                {raceData.raceName}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {raceData.raceDate}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  発走 {raceData.postTime}
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {raceData.venue}競馬場 {raceData.raceNumber}R
                </span>
              </div>
            </div>
            {raceData.isFree && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-bold">
                無料
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">コース</span>
              <p className="font-medium">{raceData.raceType}{raceData.distance}m</p>
            </div>
            <div>
              <span className="text-gray-600">天候</span>
              <p className="font-medium">{raceData.weather}</p>
            </div>
            <div>
              <span className="text-gray-600">馬場状態</span>
              <p className="font-medium">{raceData.trackCondition}</p>
            </div>
            <div>
              <span className="text-gray-600">1着賞金</span>
              <p className="font-medium">¥{(raceData.prizeFirst / 10000).toLocaleString()}万</p>
            </div>
          </div>

          {raceData.noteUrl && (
            <div className="mt-4 pt-4 border-t">
              <a 
                href={raceData.noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                📝 瀧川氏のNOTE記事を読む →
              </a>
            </div>
          )}
        </div>

        {/* 瀧川指数セクション */}
        {!canViewDetails ? (
          <div className="bg-white border border-gray-300 rounded-lg p-8 text-center">
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">瀧川指数を表示するには</h2>
            <p className="text-gray-600 mb-6">
              このレースの詳細情報を見るには{raceData.pointCost}ポイントが必要です
            </p>
            <button
              onClick={unlockRace}
              disabled={isUnlocking}
              className={`bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition-colors ${
                isUnlocking ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isUnlocking ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  処理中...
                </span>
              ) : (
                `${raceData.pointCost}ポイントで表示する`
              )}
            </button>
            <p className="text-sm text-gray-500 mt-4">
              現在の保有ポイント: {session?.user?.points || 0}pt
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3">
              <h2 className="text-xl font-bold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                瀧川指数
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-center">馬番</th>
                    <th className="text-left">馬名</th>
                    <th className="text-center">年齢</th>
                    <th className="text-center">性別</th>
                    <th className="text-center">斤量</th>
                    <th className="text-left">騎手</th>
                    <th className="text-left">調教師</th>
                    <th className="text-center">オッズ</th>
                    <th className="text-center">人気</th>
                    <th className="text-center bg-amber-50">瀧川指数</th>
                  </tr>
                </thead>
                <tbody>
                  {raceData.horses
                    .sort((a, b) => b.takigawaIndex - a.takigawaIndex)
                    .map((horse, index) => (
                      <tr key={horse.horseNumber} className={index < 3 ? 'bg-yellow-50' : ''}>
                        <td className="text-center font-bold">{horse.horseNumber}</td>
                        <td className="font-medium">{horse.horseName}</td>
                        <td className="text-center">{horse.age}歳</td>
                        <td className="text-center">{horse.sex}</td>
                        <td className="text-center">{horse.weight}kg</td>
                        <td>{horse.jockey}</td>
                        <td>{horse.trainer}</td>
                        <td className="text-center">{horse.odds}</td>
                        <td className="text-center">{horse.popularity}番人気</td>
                        <td className="text-center bg-amber-50 font-bold text-lg">
                          <span className={index === 0 ? 'text-red-600' : index === 1 ? 'text-blue-600' : index === 2 ? 'text-green-600' : ''}>
                            {horse.takigawaIndex}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 text-sm text-gray-600">
              <p className="font-bold mb-2">瀧川指数の見方</p>
              <ul className="list-disc list-inside space-y-1">
                <li>指数が高いほど期待値が高い馬となります</li>
                <li>上位3頭は色付けされています（1位:赤、2位:青、3位:緑）</li>
                <li>指数は過去のデータと瀧川氏の経験則を基に算出されています</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}