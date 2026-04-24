import './globals.css';

export const metadata = {
  title: 'Abhiram Bikkina | AI Engineer & Full Stack Developer',
  description: 'Personal portfolio of Abhiram Bikkina, showcasing skills in AI, RAG architecture, Machine Learning, and Full Stack Web Development.',
  keywords: 'Abhiram Bikkina, AI Engineer, Full Stack Developer, React, Next.js, Machine Learning, Python, Software Engineer Portfolio',
  openGraph: {
    title: 'Abhiram Bikkina | Portfolio',
    description: 'Explore my projects in Artificial Intelligence, Web Development, and Scalable Systems.',
    url: 'https://abhirambikkina.dev', /* User can change domain later */
    siteName: 'Abhiram Bikkina Portfolio',
    images: [
      {
        url: '/assests/profilepic3.png',
        width: 1200,
        height: 630,
        alt: 'Abhiram Bikkina Profile',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhiram Bikkina | Developer Portfolio',
    description: 'Explore my projects in AI and Full Stack Development.',
    images: ['/assests/profilepic3.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
