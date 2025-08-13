export default function CommercialPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">特定商取引法に基づく表記</h1>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="font-bold text-gray-700 mb-2">販売業者</h2>
              <p>瀧川指数運営事務局</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-bold text-gray-700 mb-2">運営責任者</h2>
              <p>瀧川 寿樹也</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-bold text-gray-700 mb-2">所在地</h2>
              <p>〒100-0001<br />東京都千代田区千代田1-1-1</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-bold text-gray-700 mb-2">お問い合わせ</h2>
              <p>メール: info@takigawa-index.com<br />
              ※お問い合わせはメールのみで受け付けております</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-bold text-gray-700 mb-2">販売価格</h2>
              <p>各ポイントパッケージページに表示</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-bold text-gray-700 mb-2">商品の引き渡し時期</h2>
              <p>決済完了後、即時</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-bold text-gray-700 mb-2">お支払い方法</h2>
              <p>クレジットカード（VISA、MasterCard、JCB、American Express）</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-bold text-gray-700 mb-2">返品・交換について</h2>
              <p>デジタルコンテンツの性質上、返品・返金はお受けできません。</p>
            </div>

            <div>
              <h2 className="font-bold text-gray-700 mb-2">その他</h2>
              <p>当サービスは情報提供を目的としており、ギャンブルを推奨するものではありません。<br />
              競馬は20歳以上の方のみ参加できます。節度を持ってお楽しみください。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}