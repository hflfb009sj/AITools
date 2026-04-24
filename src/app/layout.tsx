import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-030CWS3CQY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-030CWS3CQY');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
