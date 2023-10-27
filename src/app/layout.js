import { Inter } from 'next/font/google'
import Head from 'next/head'
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.css'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lembur Calc',
  description: 'Lembur Calc 2.0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
        </Head>
          <Script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></Script>
          
      <body className={inter.className}>{children}</body>
    </html>
  )
}
