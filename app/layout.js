import './globals.css'

export const metadata = {
  title: 'HEMAT - Cafe Management',
  description: 'Help Manage Anything About the Cafe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  )
}