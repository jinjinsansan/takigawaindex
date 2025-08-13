import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Calendar,
  Upload,
  FileText,
  Eye,
  Save,
  AlertCircle,
  ChevronLeft,
  Loader,
  Image as ImageIcon
} from 'lucide-react'
import { useSession } from '@/lib/auth-mock'
import { toast } from 'react-hot-toast'
import type { Race, Horse } from '@/types'

// OCR/テキスト解析のモックAPI
async function analyzeContent(content: string | File): Promise<{
  races: Partial<Race & { horses: Partial<Horse>[] }>[]
  error?: string
}> {
  // 実際の実装では Claude API を使用
  await new Promise(resolve => setTimeout(resolve, 2000)) // 処理時間のシミュレート
  
  // モックレスポンス
  return {
    races: [{
      venue: '中山',
      raceNumber: 11,
      raceName: '中山記念',
      raceType: '芝',
      distance: 1800,
      postTime: '15:45',
      gradeClass: 'G2',
      raceDate: '2024-01-14',
      horses: [
        {
          id: 'temp-1',
          raceId: 'temp',
          horseNumber: 1,
          horseName: 'エースホース',
          age: 4,
          sex: '牡',
          weight: 480,
          jockey: '横山武史',
          trainer: '鹿戸雄一',
          odds: 2.5,
          popularity: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'temp-2',
          raceId: 'temp',
          horseNumber: 2,
          horseName: 'ブレイブランナー',
          age: 5,
          sex: '牡',
          weight: 476,
          jockey: '福永祐一',
          trainer: '国枝栄',
          odds: 5.2,
          popularity: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    }]
  }
}

export default function AdminRaceInputPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [inputType, setInputType] = useState<'ocr' | 'text'>('ocr')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzedData, setAnalyzedData] = useState<Partial<Race & { horses: Partial<Horse>[] }>[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [textInput, setTextInput] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading' as any) return
    if (!session || !session.user?.isAdmin) {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [selectedFile])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('画像ファイルを選択してください')
        return
      }
      setSelectedFile(file)
      setAnalyzedData([])
    }
  }

  const handleAnalyze = async () => {
    if (inputType === 'ocr' && !selectedFile) {
      toast.error('画像を選択してください')
      return
    }
    if (inputType === 'text' && !textInput.trim()) {
      toast.error('テキストを入力してください')
      return
    }

    setIsAnalyzing(true)
    try {
      const content = inputType === 'ocr' ? selectedFile! : textInput
      const result = await analyzeContent(content)
      
      if (result.error) {
        toast.error(result.error)
      } else if (result.races.length === 0) {
        toast.error('レース情報を抽出できませんでした')
      } else {
        setAnalyzedData(result.races)
        toast.success(`${result.races.length}件のレース情報を抽出しました`)
      }
    } catch (error) {
      toast.error('解析中にエラーが発生しました')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSave = async (raceIndex: number) => {
    const race = analyzedData[raceIndex]
    if (!race) return

    try {
      // APIコールの実装
      toast.success('レース情報を保存しました')
      
      // 保存後は一覧ページに戻る
      router.push('/admin/races')
    } catch (error) {
      toast.error('保存中にエラーが発生しました')
    }
  }

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
          <h1 className="text-2xl font-bold flex items-center mb-4">
            <Calendar className="w-6 h-6 mr-2 text-amber-600" />
            レース情報入力
          </h1>
          <Link href="/admin/races" className="inline-flex items-center text-gray-600 hover:text-gray-800">
            <ChevronLeft className="w-4 h-4 mr-1" />
            レース管理に戻る
          </Link>
        </div>

        {/* 入力タイプ選択 */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setInputType('ocr')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                inputType === 'ocr'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ImageIcon className="w-5 h-5 inline-block mr-2" />
              画像から読み取り（OCR）
            </button>
            <button
              onClick={() => setInputType('text')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                inputType === 'text'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-5 h-5 inline-block mr-2" />
              テキストから解析
            </button>
          </div>

          {/* OCR入力 */}
          {inputType === 'ocr' && (
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="cursor-pointer"
                >
                  {selectedFile ? (
                    <div>
                      {previewUrl && (
                        <div className="relative w-full h-64 mb-4">
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            fill
                            style={{ objectFit: 'contain' }}
                            className="rounded"
                          />
                        </div>
                      )}
                      <p className="text-gray-700">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        別の画像を選択する場合はクリックしてください
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-700 mb-2">
                        クリックして画像を選択
                      </p>
                      <p className="text-sm text-gray-500">
                        競馬新聞の画像をアップロードしてください
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* テキスト入力 */}
          {inputType === 'text' && (
            <div>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="レース情報のテキストを貼り付けてください&#10;&#10;例：&#10;中山11R 中山記念（G2）&#10;芝1800m 発走15:45&#10;1番 エースホース 牡4 480kg 横山武史 2.5倍..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          )}

          {/* 解析ボタン */}
          <div className="mt-6 text-center">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || (inputType === 'ocr' ? !selectedFile : !textInput.trim())}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${
                isAnalyzing || (inputType === 'ocr' ? !selectedFile : !textInput.trim())
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-500 text-white hover:bg-amber-600'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  解析中...
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5 mr-2" />
                  解析開始
                </>
              )}
            </button>
          </div>
        </div>

        {/* 解析結果 */}
        {analyzedData.length > 0 && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">解析結果をご確認ください</p>
                  <p>必要に応じて編集してから保存してください。瀧川指数は保存後に自動計算されます。</p>
                </div>
              </div>
            </div>

            {analyzedData.map((race, raceIndex) => (
              <div key={raceIndex} className="bg-white border border-gray-300 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                  {race.venue} {race.raceNumber}R {race.raceName}
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      開催日
                    </label>
                    <input
                      type="date"
                      value={race.raceDate}
                      onChange={(e) => {
                        const updated = [...analyzedData]
                        updated[raceIndex] = { ...race, raceDate: e.target.value }
                        setAnalyzedData(updated)
                      }}
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
                      onChange={(e) => {
                        const updated = [...analyzedData]
                        updated[raceIndex] = { ...race, postTime: e.target.value }
                        setAnalyzedData(updated)
                      }}
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
                        onChange={(e) => {
                          const updated = [...analyzedData]
                          updated[raceIndex] = { ...race, raceType: e.target.value }
                          setAnalyzedData(updated)
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="芝">芝</option>
                        <option value="ダート">ダート</option>
                      </select>
                      <input
                        type="number"
                        value={race.distance}
                        onChange={(e) => {
                          const updated = [...analyzedData]
                          updated[raceIndex] = { ...race, distance: parseInt(e.target.value) }
                          setAnalyzedData(updated)
                        }}
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
                      onChange={(e) => {
                        const updated = [...analyzedData]
                        updated[raceIndex] = { ...race, category: e.target.value as any }
                        setAnalyzedData(updated)
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">選択してください</option>
                      <option value="central">中央競馬</option>
                      <option value="local">地方競馬</option>
                      <option value="g1">G1レース</option>
                      <option value="g2g3">G2・G3</option>
                      <option value="free">無料レース</option>
                    </select>
                  </div>
                </div>

                {/* 出走馬一覧 */}
                {race.horses && race.horses.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-bold mb-3">出走馬一覧</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="p-2 text-left">馬番</th>
                            <th className="p-2 text-left">馬名</th>
                            <th className="p-2 text-left">性齢</th>
                            <th className="p-2 text-left">騎手</th>
                            <th className="p-2 text-left">調教師</th>
                            <th className="p-2 text-right">オッズ</th>
                            <th className="p-2 text-center">人気</th>
                          </tr>
                        </thead>
                        <tbody>
                          {race.horses.map((horse, horseIndex) => (
                            <tr key={horseIndex} className="border-t">
                              <td className="p-2">{horse.horseNumber}</td>
                              <td className="p-2 font-medium">{horse.horseName}</td>
                              <td className="p-2">{horse.sex}{horse.age}</td>
                              <td className="p-2">{horse.jockey}</td>
                              <td className="p-2">{horse.trainer}</td>
                              <td className="p-2 text-right">{horse.odds}</td>
                              <td className="p-2 text-center">{horse.popularity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 保存ボタン */}
                <div className="mt-6 text-right">
                  <button
                    onClick={() => handleSave(raceIndex)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    このレースを保存
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}