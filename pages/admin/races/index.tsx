import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  Calendar, 
  Edit, 
  Trash, 
  Eye, 
  EyeOff,
  Plus,
  Filter,
  ChevronLeft
} from 'lucide-react'
import { useSession } from '@/lib/auth-mock'
import { toast } from 'react-hot-toast'
import type { Race } from '@/types'

// ダミーデータ（実際にはAPIから取得）
const dummyRaces: Race[] = [
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
    showOnTop: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  }
]

export default function AdminRacesPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [races, setRaces] = useState<Race[]>(dummyRaces)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (status === 'loading' as any) return
    if (!session || !session.user?.isAdmin) {
      router.push('/')
    }
  }, [session, status, router])

  const handleTogglePublish = async (raceId: string) => {
    try {
      // APIコール実装
      setRaces(races.map(race => 
        race.id === raceId ? { ...race, isPublished: !race.isPublished } : race
      ))
      toast.success('公開状態を更新しました')
    } catch (error) {
      toast.error('エラーが発生しました')
    }
  }

  const handleToggleTopPage = async (raceId: string) => {
    try {
      setRaces(races.map(race => 
        race.id === raceId ? { ...race, showOnTop: !race.showOnTop } : race
      ))
      toast.success('トップページ表示を更新しました')
    } catch (error) {
      toast.error('エラーが発生しました')
    }
  }

  const handleCategoryChange = async (raceId: string, category: string) => {
    try {
      setRaces(races.map(race => 
        race.id === raceId ? { ...race, category: category as Race['category'] } : race
      ))
      toast.success('カテゴリを更新しました')
    } catch (error) {
      toast.error('エラーが発生しました')
    }
  }

  const handleDelete = async (raceId: string) => {
    if (!confirm('このレースを削除してもよろしいですか？')) return
    
    try {
      setRaces(races.filter(race => race.id !== raceId))
      toast.success('レースを削除しました')
    } catch (error) {
      toast.error('エラーが発生しました')
    }
  }

  const filteredRaces = filter 
    ? races.filter(race => race.category === filter)
    : races

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
              <Calendar className="w-6 h-6 mr-2 text-amber-600" />
              レース管理
            </h1>
            <Link 
              href="/admin/races/input"
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
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">全てのカテゴリ</option>
              <option value="central">中央競馬</option>
              <option value="local">地方競馬</option>
              <option value="g1">G1レース</option>
              <option value="g2g3">G2・G3</option>
              <option value="free">無料レース</option>
            </select>
          </div>
        </div>

        {/* レース一覧 */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-4">開催日</th>
                  <th className="text-left p-4">競馬場</th>
                  <th className="text-left p-4">R</th>
                  <th className="text-left p-4">レース名</th>
                  <th className="text-center p-4">カテゴリ</th>
                  <th className="text-center p-4">ポイント</th>
                  <th className="text-center p-4">公開</th>
                  <th className="text-center p-4">TOP表示</th>
                  <th className="text-center p-4">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredRaces.map(race => (
                  <tr key={race.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{race.raceDate}</td>
                    <td className="p-4">{race.venue}</td>
                    <td className="p-4 font-bold">{race.raceNumber}R</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 rounded text-white text-xs mr-2 ${
                        race.gradeClass === 'G1' ? 'bg-red-600' :
                        race.gradeClass === 'G2' ? 'bg-blue-600' :
                        race.gradeClass === 'G3' ? 'bg-green-600' :
                        'bg-purple-600'
                      }`}>
                        {race.gradeClass}
                      </span>
                      {race.raceName}
                    </td>
                    <td className="p-4">
                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                        value={race.category || ''}
                        onChange={(e) => handleCategoryChange(race.id, e.target.value)}
                      >
                        <option value="">未設定</option>
                        <option value="central">中央競馬</option>
                        <option value="local">地方競馬</option>
                        <option value="g1">G1レース</option>
                        <option value="g2g3">G2・G3</option>
                        <option value="free">無料レース</option>
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      {race.isFree ? (
                        <span className="text-green-600 font-bold">無料</span>
                      ) : (
                        <span>{race.pointCost}pt</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(race.id)}
                        className={`p-2 rounded ${
                          race.isPublished 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {race.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={race.showOnTop}
                        onChange={() => handleToggleTopPage(race.id)}
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          href={`/admin/races/edit/${race.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(race.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}