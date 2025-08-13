import Link from 'next/link'
import { Twitter, Facebook, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* メインフッター */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド情報 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-amber-500 rounded p-2">
                <span className="text-white font-black text-xl">瀧</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-white">瀧川指数</h2>
                <p className="text-xs text-gray-400">元地方競馬ジョッキー瀧川寿樹也監修</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              長年の経験と独自の分析手法により、精度の高い競馬予想指数を提供します。
              皆様の競馬ライフをより豊かにすることを目指しています。
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@takigawa-index.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* サービス */}
          <div>
            <h3 className="text-white font-bold mb-4">サービス</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/races" className="text-sm hover:text-white transition-colors">
                  レース一覧
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-sm hover:text-white transition-colors">
                  使い方ガイド
                </Link>
              </li>
              <li>
                <Link href="/points/purchase" className="text-sm hover:text-white transition-colors">
                  ポイント購入
                </Link>
              </li>
              <li>
                <a 
                  href="https://note.com"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-sm hover:text-white transition-colors"
                >
                  瀧川氏のNOTE
                </a>
              </li>
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h3 className="text-white font-bold mb-4">サポート</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm hover:text-white transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/commercial" className="text-sm hover:text-white transition-colors">
                  特定商取引法に基づく表記
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* LINE公式アカウント案内 */}
      <div className="bg-[#00B900] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-4 md:mb-0">
              <p className="font-bold mb-1">LINE公式アカウント</p>
              <p className="text-sm">友達追加で500ポイントプレゼント！</p>
            </div>
            <a 
              href="https://line.me/R/ti/p/@takigawa-index"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#00B900] font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
              </svg>
              <span>友だち追加</span>
            </a>
          </div>
        </div>
      </div>

      {/* コピーライト */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500">
            © {currentYear} 瀧川指数. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer