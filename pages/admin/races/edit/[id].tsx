import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  Calendar,
  Save,
  ChevronLeft,
  Plus,
  Trash,
  AlertCircle
} from 'lucide-react'
import { useSession } from '@/lib/auth-mock'
import { toast } from 'react-hot-toast'
import type { Race, Horse } from '@/types'

// ダミーデータ取得（実際にはAPIから取得）
const fetchRace = async (id: string): Promise<Race | null> => {
  // ダミーレスポンス
  if (id === '1') {
    return {
      id: '1',
      venue: '中山',
      raceNumber: 11,
      raceName: '有馬記念',
      postTime: '15:25',
      gradeClass: 'G1',
      raceType: '芝',
      distance: 2500,
      weather: '晴',
      trackCondition: '良',
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
      horses: [
        {
          id: '1-1',
          raceId: '1',
          horseNumber: 1,
          horseName: 'エースホース',
          age: 4,
          sex: '牡',
          weight: 480,
          weightChange: 2,
          jockey: '横山武史',
          trainer: '鹿戸雄一',
          odds: 2.5,
          popularity: 1,
          takigawaIndex: 85.5,
          comment: '前走好走、状態良好',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        },
        {
          id: '1-2',
          raceId: '1',
          horseNumber: 2,
          horseName: 'ブレイブランナー',
          age: 5,
          sex: '牡',
          weight: 476,
          weightChange: -4,
          jockey: '福永祐一',
          trainer: '国枝栄',
          odds: 5.2,
          popularity: 2,
          takigawaIndex: 78.3,
          comment: '休み明け、要注意',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        }
      ]
    }
  }
  return null
}

export default function AdminRaceEditPage() {
  const router = useRouter()
  const { id } = router.query
  const { data: session, status } = useSession()
  const [race, setRace] = useState<Race | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (status === 'loading' as any) return
    if (!session || !session.user?.isAdmin) {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchRace(id).then(data => {
        setRace(data)
        setLoading(false)
      })
    }
  }, [id])

  const handleRaceUpdate = (field: keyof Race, value: any) => {
    if (!race) return
    setRace({ ...race, [field]: value })
  }

  const handleHorseUpdate = (horseIndex: number, field: keyof Horse, value: any) => {
    if (!race || !race.horses) return
    const updatedHorses = [...race.horses]
    updatedHorses[horseIndex] = { ...updatedHorses[horseIndex], [field]: value }
    setRace({ ...race, horses: updatedHorses })
  }

  const handleAddHorse = () => {
    if (!race) return
    const newHorse: Horse = {
      id: `new-${Date.now()}`,
      raceId: race.id,
      horseNumber: (race.horses?.length || 0) + 1,
      horseName: '',
      age: 3,
      sex: '牡',
      weight: 480,
      jockey: '',
      trainer: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setRace({ ...race, horses: [...(race.horses || []), newHorse] })
  }

  const handleRemoveHorse = (horseIndex: number) => {
    if (!race || !race.horses) return
    const updatedHorses = race.horses.filter((_, index) => index !== horseIndex)
    setRace({ ...race, horses: updatedHorses })
  }

  const handleSave = async () => {
    if (!race) return
    
    setSaving(true)
    try {
      // APIコールの実装
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('レース情報を更新しました')
      router.push('/admin/races')
    } catch (error) {
      toast.error('更新中にエラーが発生しました')
    } finally {
      setSaving(false)
    }
  }

  const calculateTakigawaIndex = async () => {
    if (!race || !race.horses) return
    
    try {
      // 瀧川指数の計算（実際にはAPIコール）
      toast.success('瀧川指数を再計算しました')
      
      // ダミーで更新
      const updatedHorses = race.horses.map(horse => ({
        ...horse,
        takigawaIndex: Math.random() * 30 + 70 // 70-100のランダム値
      }))
      setRace({ ...race, horses: updatedHorses })
    } catch (error) {
      toast.error('計算中にエラーが発生しました')
    }
  }

  if (status === 'loading' as any || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (!session?.user?.isAdmin || !race) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* ヘッダー */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold flex items-center mb-4">
            <Calendar className="w-6 h-6 mr-2 text-amber-600" />
            レース編集
          </h1>
          <Link href="/admin/races" className="inline-flex items-center text-gray-600 hover:text-gray-800">
            <ChevronLeft className="w-4 h-4 mr-1" />
            レース管理に戻る
          </Link>
        </div>

        {/* 基本情報 */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">基本情報</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                開催日
              </label>
              <input
                type="date"
                value={race.raceDate}
                onChange={(e) => handleRaceUpdate('raceDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                競馬場
              </label>
              <input
                type="text"
                value={race.venue}
                onChange={(e) => handleRaceUpdate('venue', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                レース番号
              </label>
              <input
                type="number"
                value={race.raceNumber}
                onChange={(e) => handleRaceUpdate('raceNumber', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                レース名
              </label>
              <input
                type="text"
                value={race.raceName}
                onChange={(e) => handleRaceUpdate('raceName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                グレード/クラス
              </label>
              <input
                type="text"
                value={race.gradeClass || ''}
                onChange={(e) => handleRaceUpdate('gradeClass', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                発走時刻
              </label>
              <input
                type="text"
                value={race.postTime}
                onChange={(e) => handleRaceUpdate('postTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                コース
              </label>
              <div className="flex space-x-2">
                <select
                  value={race.raceType}
                  onChange={(e) => handleRaceUpdate('raceType', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="芝">芝</option>
                  <option value="ダート">ダート</option>
                </select>
                <input
                  type="number"
                  value={race.distance}
                  onChange={(e) => handleRaceUpdate('distance', parseInt(e.target.value))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="距離"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                カテゴリ
              </label>
              <select
                value={race.category || ''}
                onChange={(e) => handleRaceUpdate('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">未設定</option>
                <option value="central">中央競馬</option>
                <option value="local">地方競馬</option>
                <option value="g1">G1レース</option>
                <option value="g2g3">G2・G3</option>
                <option value="free">無料レース</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                天候
              </label>
              <input
                type="text"
                value={race.weather || ''}
                onChange={(e) => handleRaceUpdate('weather', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                馬場状態
              </label>
              <input
                type="text"
                value={race.trackCondition || ''}
                onChange={(e) => handleRaceUpdate('trackCondition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ポイント
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={race.isFree}
                  onChange={(e) => handleRaceUpdate('isFree', e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>無料</span>
                {!race.isFree && (
                  <input
                    type="number"
                    value={race.pointCost}
                    onChange={(e) => handleRaceUpdate('pointCost', parseInt(e.target.value))}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NOTE URL
              </label>
              <input
                type="url"
                value={race.noteUrl || ''}
                onChange={(e) => handleRaceUpdate('noteUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={race.isPublished}
                onChange={(e) => handleRaceUpdate('isPublished', e.target.checked)}
                className="rounded text-amber-600 mr-2"
              />
              <span>公開する</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={race.showOnTop}
                onChange={(e) => handleRaceUpdate('showOnTop', e.target.checked)}
                className="rounded text-amber-600 mr-2"
              />
              <span>トップページに表示</span>
            </label>
          </div>
        </div>

        {/* 出走馬情報 */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">出走馬情報</h2>
            <div className="space-x-2">
              <button
                onClick={calculateTakigawaIndex}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                瀧川指数を再計算
              </button>
              <button
                onClick={handleAddHorse}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus className="w-4 h-4 inline-block mr-1" />
                馬を追加
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-start">
              <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                瀧川指数は保存時に自動計算されます。手動で再計算することも可能です。
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left">馬番</th>
                  <th className="p-2 text-left">馬名</th>
                  <th className="p-2 text-left">性齢</th>
                  <th className="p-2 text-left">体重</th>
                  <th className="p-2 text-left">騎手</th>
                  <th className="p-2 text-left">調教師</th>
                  <th className="p-2 text-right">オッズ</th>
                  <th className="p-2 text-center">人気</th>
                  <th className="p-2 text-center">瀧川指数</th>
                  <th className="p-2 text-left">コメント</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {race.horses?.map((horse, index) => (
                  <tr key={horse.id} className="border-t">
                    <td className="p-2">
                      <input
                        type="number"
                        value={horse.horseNumber}
                        onChange={(e) => handleHorseUpdate(index, 'horseNumber', parseInt(e.target.value))}
                        className="w-12 px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={horse.horseName}
                        onChange={(e) => handleHorseUpdate(index, 'horseName', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-1">
                        <select
                          value={horse.sex}
                          onChange={(e) => handleHorseUpdate(index, 'sex', e.target.value)}
                          className="w-12 px-1 py-1 border border-gray-300 rounded text-xs"
                        >
                          <option value="牡">牡</option>
                          <option value="牝">牝</option>
                          <option value="セ">セ</option>
                        </select>
                        <input
                          type="number"
                          value={horse.age}
                          onChange={(e) => handleHorseUpdate(index, 'age', parseInt(e.target.value))}
                          className="w-10 px-1 py-1 border border-gray-300 rounded"
                        />
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-1">
                        <input
                          type="number"
                          value={horse.weight}
                          onChange={(e) => handleHorseUpdate(index, 'weight', parseInt(e.target.value))}
                          className="w-14 px-1 py-1 border border-gray-300 rounded"
                        />
                        <input
                          type="number"
                          value={horse.weightChange || 0}
                          onChange={(e) => handleHorseUpdate(index, 'weightChange', parseInt(e.target.value))}
                          className="w-12 px-1 py-1 border border-gray-300 rounded"
                          placeholder="+/-"
                        />
                      </div>
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={horse.jockey}
                        onChange={(e) => handleHorseUpdate(index, 'jockey', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={horse.trainer}
                        onChange={(e) => handleHorseUpdate(index, 'trainer', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.1"
                        value={horse.odds || ''}
                        onChange={(e) => handleHorseUpdate(index, 'odds', parseFloat(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-right"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={horse.popularity || ''}
                        onChange={(e) => handleHorseUpdate(index, 'popularity', parseInt(e.target.value))}
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                    </td>
                    <td className="p-2 text-center font-bold text-amber-600">
                      {horse.takigawaIndex?.toFixed(1) || '-'}
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={horse.comment || ''}
                        onChange={(e) => handleHorseUpdate(index, 'comment', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleRemoveHorse(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 保存ボタン */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/races"
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
            {saving ? '保存中...' : '変更を保存'}
          </button>
        </div>
      </div>
    </div>
  )
}