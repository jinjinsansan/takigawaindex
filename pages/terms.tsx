export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">利用規約</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">最終更新日: 2024年1月13日</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">第1条（利用規約の適用）</h2>
            <p className="mb-4">
              本利用規約（以下「本規約」といいます）は、瀧川指数（以下「当サービス」といいます）の利用条件を定めるものです。
              登録ユーザーの皆様（以下「ユーザー」といいます）には、本規約に従って、当サービスをご利用いただきます。
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">第2条（利用登録）</h2>
            <p className="mb-4">
              利用登録の申請者は、当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">第3条（ポイントについて）</h2>
            <p className="mb-4">
              1. ポイントは1ポイント1円として購入できます。<br />
              2. 購入したポイントの払い戻しはできません。<br />
              3. ポイントの有効期限は最終利用日から1年間とします。
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">第4条（禁止事項）</h2>
            <p className="mb-4">
              ユーザーは、当サービスの利用にあたり、以下の行為をしてはなりません。
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当サービスのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
              <li>当サービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
              <li>他のユーザーに成りすます行為</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">第5条（免責事項）</h2>
            <p className="mb-4">
              1. 当サービスで提供する情報は、競馬予想の参考情報であり、的中を保証するものではありません。<br />
              2. 当サービスの利用によって生じた損害について、当社は一切の責任を負いません。
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">第6条（利用規約の変更）</h2>
            <p className="mb-4">
              当社は、必要と判断した場合には、ユーザーに通知することなく、いつでも本規約を変更することができるものとします。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}