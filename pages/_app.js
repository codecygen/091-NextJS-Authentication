import Layout from '../components/layout/layout';

// This is needed to keep track of sessions in the page.
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    // SessionProvider is needed to keep track of sessions in the page.
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
