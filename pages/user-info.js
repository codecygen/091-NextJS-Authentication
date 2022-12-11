import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import classes from './user-info.module.css';

function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <div className={classes.center}>
          <h1>This page is for user info!</h1>
          <h2>Person Name: My Name</h2>
        </div>
      </>
    );
  }

  if (status === 'unauthenticated') {
    router.replace('/auth');
  }

  return <p>Loading</p>
}

export default ProfilePage;
