import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        // If logged in go to the starting page.
        router.replace('/');
      }
    });
  }, [router]);

  return <AuthForm />;
}

export default AuthPage;
