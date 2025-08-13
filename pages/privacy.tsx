export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">最終更新日: 2024年1月13日</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. 個人情報の収集</h2>
            <p className="mb-4">
              当サービスでは、サービス提供のために以下の個人情報を収集します：
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>LINEアカウント情報（ユーザーID、表示名、プロフィール画像）</li>
              <li>メールアドレス（任意）</li>
              <li>サービス利用履歴</li>
              <li>ポイント購入履歴</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">2. 個人情報の利用目的</h2>
            <p className="mb-4">
              収集した個人情報は、以下の目的で利用します：
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>サービスの提供・運営</li>
              <li>ユーザーサポート</li>
              <li>サービスの改善・新機能の開発</li>
              <li>重要なお知らせの通知</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">3. 個人情報の第三者提供</h2>
            <p className="mb-4">
              当社は、以下の場合を除き、個人情報を第三者に提供することはありません：
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>ユーザーの同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">4. セキュリティ</h2>
            <p className="mb-4">
              当社は、個人情報の漏洩、滅失、毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Cookieの使用</h2>
            <p className="mb-4">
              当サービスでは、ユーザー体験の向上のためにCookieを使用しています。
              Cookieの使用を望まない場合は、ブラウザの設定から無効にすることができます。
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. お問い合わせ</h2>
            <p className="mb-4">
              個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください：<br />
              メール: privacy@takigawa-index.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}