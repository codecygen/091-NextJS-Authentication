import { getSession } from 'next-auth/react';

import classes from './user-info.module.css';

function ProfilePage2() {

  return (
    <div className={classes.center}>
      <h1>This page is for user info!</h1>
      <h2>Person Name: My Name</h2>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({req: context.req});

  if (!session) {
    return {
      redirect: {
        destination: '/auth', 
        // Permanent false means only this time redirect
        permanent: false
      }
    };
  }

  return {
    props: {
      session
    }
  };
};

export default ProfilePage2;
