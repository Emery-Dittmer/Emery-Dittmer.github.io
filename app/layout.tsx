import './css/style.css'

import { Inter, Architects_Daughter } from 'next/font/google'

import Header from '@/components/ui/header'
import Banner from '@/components/banner'
import ChatbotWidget from '@/components/chatbot-widget'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
})

export const metadata = {
  title: 'Portfolio of emery Dittmer',
  description: 'Created using next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{__html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`}} />
      </head>
      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-200 tracking-tight`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen overflow-hidden pt-20">
            <Header />
            {children}
            <Banner />
            <ChatbotWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
 