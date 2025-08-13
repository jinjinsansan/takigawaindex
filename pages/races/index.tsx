import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Trophy, TrendingUp, FileText, Filter } from 'lucide-react'
import { useRouter } from 'next/router'

// ダミーデータ（実際にはAPIから取得）
const allRaces = [
  {
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
    category: 'g1'
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
    horsesCount: 18,
    noteUrl: null,
    isFree: false,
    pointCost: 500,
    raceDate: '2024-01-13',
    category: 'g2g3'
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
    horsesCount: 16,
    noteUrl: null,
    isFree: true,
    pointCost: 0,
    raceDate: '2024-01-13',
    category: 'free'
  },
  {
    id: '4',
    venue: '大井',
    raceNumber: 11,
    raceName: '東京大賞典',
    postTime: '15:30',
    gradeClass: 'G1',
    raceType: 'ダ',
    distance: 2000,
    horsesCount: 16,
    noteUrl: null,
    isFree: false,
    pointCost: 500,
    raceDate: '2024-01-14',
    category: 'local'
  }
]

export default function RacesPage() {
  const router = useRouter()
  const { type, grade, free } = router.query
  const [filteredRaces, setFilteredRaces] = useState(allRaces)
  const [selectedDate, setSelectedDate] = useState<string>('')

  useEffect(() => {
    let filtered = allRaces

    // カテゴリフィルタリング
    if (type === 'central') {
      filtered = filtered.filter(race => ['中山', '東京', '阪神', '京都', '中京', '新潟', '福島', '札幌', '函館', '小倉'].includes(race.venue))
    } else if (type === 'local') {
      filtered = filtered.filter(race => !['中山', '東京', '阪神', '京都', '中京', '新潟', '福島', '札幌', '函館', '小倉'].includes(race.venue))
    }

    if (grade === 'g1') {
      filtered = filtered.filter(race => race.gradeClass === 'G1')
    } else if (grade === 'g2g3') {
      filtered = filtered.filter(race => ['G2', 'G3'].includes(race.gradeClass))
    }

    if (free === 'true') {
      filtered = filtered.filter(race => race.isFree)
    }

    // 日付フィルタリング
    if (selectedDate) {
      filtered = filtered.filter(race => race.raceDate === selectedDate)
    }

    setFilteredRaces(filtered)
  }, [type, grade, free, selectedDate])

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

  const getFilterTitle = () => {
    if (type === 'central') return '中央競馬'
    if (type === 'local') return '地方競馬'
    if (grade === 'g1') return 'G1レース'
    if (grade === 'g2g3') return 'G2・G3レース'
    if (free === 'true') return '無料レース'
    return '全レース'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* ページタイトル */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
          <h1 className="text-2xl font-bold flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-amber-600" />
            {getFilterTitle()}一覧
          </h1>
        </div>

        {/* フィルター */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">全ての日程</option>
              <option value="2024-01-13">2024年1月13日（土）</option>
              <option value="2024-01-14">2024年1月14日（日）</option>
              <option value="2024-01-15">2024年1月15日（月）</option>
            </select>
          </div>
        </div>

        {/* レース一覧 */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2 text-sm font-bold">
            レース一覧（{filteredRaces.length}件）
          </div>
          
          {filteredRaces.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              該当するレースがありません
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">開催日</th>
                    <th className="text-left">時刻</th>
                    <th className="text-left">競馬場</th>
                    <th className="text-left">R</th>
                    <th className="text-left">レース名</th>
                    <th className="text-center">条件</th>
                    <th className="text-center">頭数</th>
                    <th className="text-center">指数</th>
                    <th className="text-center">ポイント</th>
                    <th className="text-center">詳細</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRaces.map(race => (
                    <tr key={race.id} className="hover:bg-gray-50">
                      <td className="text-sm">{race.raceDate}</td>
                      <td className="text-sm">{race.postTime}</td>
                      <td className="text-sm">{race.venue}</td>
                      <td className="text-sm font-bold">{race.raceNumber}R</td>
                      <td className="text-sm">
                        <span className={getGradeColor(race.gradeClass)}>{race.gradeClass}</span>
                        {' '}{race.raceName}
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
                      <td className="text-center">
                        <Link 
                          href={`/races/${race.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          詳細
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