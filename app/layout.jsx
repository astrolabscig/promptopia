import '../styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI prompts.',
    icons: {
        icon: '/assets/images/logo.svg',           // your custom icon
        shortcut: '/assets/images/logo.svg', // optional
        apple: '/assets/images/logo.svg',       // optional Apple touch icon
  },
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
            <div className="main">
                <div className="gradient"/>
            </div>

            <main className="app">
                <Nav />
                {children}
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout