import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CreditCard, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { useSession } from '@/lib/auth-mock' // 本番時はnext-auth/reactに変更
import { toast } from 'react-hot-toast'

const pointPackages = [
  {
    id: 'pkg-500',
    points: 500,
    price: 500,
    label: 'お試しパック',
    description: '1レース分',
    popular: false
  },
  {
    id: 'pkg-1000',
    points: 1000,
    price: 1000,
    label: 'スタンダード',
    description: '2レース分',
    popular: false
  },
  {
    id: 'pkg-3000',
    points: 3000,
    price: 3000,
    label: 'バリューパック',
    description: '6レース分',
    popular: true
  },
  {
    id: 'pkg-5000',
    points: 5000,
    price: 5000,
    label: 'プレミアム',
    description: '10レース分',
    popular: false
  },
  {
    id: 'pkg-10000',
    points: 10000,
    price: 10000,
    label: 'プロフェッショナル',
    description: '20レース分',
    popular: false
  }
]

export default function PointsPurchasePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // 認証チェック
    if (status === 'loading' as any) return
    if (!session) {
      router.push('/auth/login')
    }
  }, [session, status, router])

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast.error('パッケージを選択してください')
      return
    }

    setIsProcessing(true)
    try {
      // ここでStripe決済処理を実装
      toast.success('決済処理を開始します（開発中）')
      
      // 実際の実装では以下のような処理を行う
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ packageId: selectedPackage })
      // })
      // const { sessionId } = await response.json()
      // await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      toast.error('エラーが発生しました')
    } finally {
      setIsProcessing(false)
    }
  }

  if (status === 'loading' as any) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* ページタイトル */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6 mr-2 text-amber-600" />
            ポイント購入
          </h1>
          <div className="text-center">
            <p className="text-gray-600 mb-2">現在の保有ポイント</p>
            <p className="text-3xl font-bold text-amber-600">
              {session.user?.points?.toLocaleString() || 0}
              <span className="text-lg">pt</span>
            </p>
          </div>
        </div>

        {/* パッケージ選択 */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">パッケージを選択</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pointPackages.map(pkg => (
              <div
                key={pkg.id}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPackage === pkg.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      人気
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {pkg.points.toLocaleString()}
                    <span className="text-sm">pt</span>
                  </p>
                  <p className="text-lg font-bold text-amber-600 mb-1">
                    ¥{pkg.price.toLocaleString()}
                  </p>
                  <p className="font-medium text-gray-700">{pkg.label}</p>
                  <p className="text-xs text-gray-500">{pkg.description}</p>
                </div>
                {selectedPackage === pkg.id && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-5 h-5 text-amber-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 支払い情報 */}
        {selectedPackage && (
          <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">お支払い内容</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">選択パッケージ</span>
                <span className="font-medium">
                  {pointPackages.find(p => p.id === selectedPackage)?.label}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">獲得ポイント</span>
                <span className="font-medium">
                  {pointPackages.find(p => p.id === selectedPackage)?.points.toLocaleString()}pt
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold">合計金額</span>
                  <span className="font-bold text-xl text-amber-600">
                    ¥{pointPackages.find(p => p.id === selectedPackage)?.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 注意事項 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-yellow-800 mb-1">ご購入前の注意事項</p>
              <ul className="list-disc list-inside text-yellow-700 space-y-1">
                <li>購入したポイントの払い戻しはできません</li>
                <li>ポイントに有効期限はありませんが、最終利用から1年間利用がない場合は失効する可能性があります</li>
                <li>決済にはStripeを使用し、クレジットカード情報は安全に処理されます</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 購入ボタン */}
        <div className="text-center">
          <button
            onClick={handlePurchase}
            disabled={!selectedPackage || isProcessing}
            className={`py-3 px-8 rounded-lg font-bold text-white transition-all ${
              !selectedPackage || isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                処理中...
              </span>
            ) : (
              '購入手続きへ進む'
            )}
          </button>
        </div>

        {/* 決済方法 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">利用可能な決済方法</p>
          <div className="flex justify-center space-x-4">
            <div className="text-gray-400">
              <CreditCard className="w-8 h-8" />
            </div>
            {/* 実際のクレジットカードブランドロゴを表示 */}
          </div>
        </div>
      </div>
    </div>
  )
}