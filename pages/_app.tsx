import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import { SessionProvider } from 'next-auth/react' // 本番用
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { Toaster } from 'react-hot-toast'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    // <SessionProvider session={session}> // 本番用
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#f59e0b',
              secondary: '#fff',
            },
          },
        }}
      />
    {/* </SessionProvider> */}
    </>
  )
}