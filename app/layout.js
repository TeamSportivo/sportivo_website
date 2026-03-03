import './globals.css'

export const metadata = {
  title: 'Sportivo | FIEM Sports Club',
  description: 'The official sports club of Future Institute of Engineering and Management, Kolkata. Follow us @sportivoteamfuture. Compete. Conquer. Champion.',
  keywords: 'Sportivo, FIEM, sports, college sports, Future Institute of Engineering and Management',
  openGraph: {
    title: 'Sportivo | FIEM Sports Club',
    description: 'Compete. Conquer. Champion. The official sports club of FIEM, Kolkata.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
