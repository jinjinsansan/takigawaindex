import { Book, CreditCard, TrendingUp, Users, HelpCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* ページタイトル */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center mb-4">瀧川指数の使い方</h1>
          <p className="text-center text-gray-600">
            元地方競馬ジョッキー瀧川寿樹也氏監修の競馬予想指数サービスの使い方をご説明します
          </p>
        </div>

        {/* ステップガイド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* ステップ1 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 rounded-full p-3 mr-3">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold">STEP 1</h2>
                <p className="text-sm text-gray-600">会員登録</p>
              </div>
            </div>
            <p className="text-sm mb-4">
              LINEアカウントでログインするだけで簡単に会員登録が完了します。
              友達追加で500ポイントプレゼント！
            </p>
            <Link href="/auth/login" className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center">
              今すぐ登録
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* ステップ2 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 rounded-full p-3 mr-3">
                <CreditCard className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold">STEP 2</h2>
                <p className="text-sm text-gray-600">ポイント購入</p>
              </div>
            </div>
            <p className="text-sm mb-4">
              レース予想を見るにはポイントが必要です。
              1ポイント=1円で、お得なパッケージも用意しています。
            </p>
            <Link href="/points/purchase" className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center">
              ポイント購入へ
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* ステップ3 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 rounded-full p-3 mr-3">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold">STEP 3</h2>
                <p className="text-sm text-gray-600">予想を見る</p>
              </div>
            </div>
            <p className="text-sm mb-4">
              レース詳細ページから瀧川指数を確認。
              独自の分析による精度の高い予想をご覧いただけます。
            </p>
            <Link href="/races" className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center">
              レース一覧へ
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* 詳細説明 */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3">
            <h2 className="text-xl font-bold flex items-center">
              <Book className="w-5 h-5 mr-2" />
              瀧川指数とは
            </h2>
          </div>
          <div className="p-6">
            <p className="mb-4">
              瀧川指数は、元地方競馬ジョッキーの瀧川寿樹也氏が、
              長年の騎乗経験と独自の分析手法を組み合わせて開発した競馬予想指数です。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 text-amber-600">特徴1: プロの視点</h3>
                <p className="text-sm text-gray-600">
                  実際に騎乗していた経験から、馬の調子や適性を的確に判断。
                  データだけでは見えない部分も考慮した予想を提供します。
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-amber-600">特徴2: 独自の指数算出</h3>
                <p className="text-sm text-gray-600">
                  過去のレースデータと現場での経験を融合させた独自のアルゴリズムで、
                  各馬の期待値を数値化しています。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
            <h2 className="text-xl font-bold flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              よくある質問
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-bold mb-2">Q. 無料で見られるレースはありますか？</h3>
              <p className="text-sm text-gray-600">
                はい、管理者が指定した無料レースは、ポイントを消費せずにご覧いただけます。
                無料レースは「無料」マークが表示されています。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Q. ポイントの有効期限はありますか？</h3>
              <p className="text-sm text-gray-600">
                購入したポイントに有効期限はありません。
                ただし、最終利用日から1年間利用がない場合は失効する可能性があります。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Q. 的中保証はありますか？</h3>
              <p className="text-sm text-gray-600">
                競馬は公営ギャンブルであり、100%の的中を保証することはできません。
                瀧川指数は予想の参考情報としてご利用ください。
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-8 mt-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">今すぐ瀧川指数を体験しよう！</h2>
          <p className="mb-6">LINE友達追加で500ポイントプレゼント中</p>
          <Link 
            href="/auth/login"
            className="bg-white text-amber-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 inline-flex items-center"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
            </svg>
            無料で始める
          </Link>
        </div>
      </div>
    </div>
  )
}