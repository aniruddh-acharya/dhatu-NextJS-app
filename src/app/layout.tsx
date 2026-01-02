import './globals.css'
import Navbar from '../components/Navbar'
import AuthProvider from './context/AuthProvider'

// const websiteFont = Montserrat({ subsets: ['latin'], weight: "400" })

export const metadata = {
  title: 'New Dhatu',
  description: 'Unlock the full potential of your business and Get the intelligence your business deserves. Data driven, easy and economical.​',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={`font-sans antialiased`}>
          <Navbar />        
          <main className="flex justify-center items-start p-6 min-h-screen">
            {children}
          </main>
      </body>
      </AuthProvider>  
    </html>
  )
}
