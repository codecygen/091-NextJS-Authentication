import { getSession } from 'next-auth/react';

import UserProfile from '../components/profile/user-profile';

function ProfilePage2() {

  return (
    <>
      <UserProfile />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

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
