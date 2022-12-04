import Layout from '../components/layout/layout';

// This is needed to keep track of sessions in the page.
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    // SessionProvider is needed to keep track of sessions in the page.
    // session={pageProps.session} is needed as if you reload the page,
    // for example, ./pages/profile2.js page uses backend to validate
    // session information. In order to prevent software to send extra
    // validation request to the server, we should use session={pageProps.session}
    // This can be checked from Netword section. Simply remove 
    // session={pageProps.session} and reload the page while in the Network
    // tab of your browser while on the http://localhost:3000/profile2 page,
    // then remove session={pageProps.session} and try the same thing. You will
    // see that if session={pageProps.session} provided, session request will not
    // be sent to the server after the initial check.
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
