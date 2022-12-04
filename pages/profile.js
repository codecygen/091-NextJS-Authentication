import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>
  }
  
  if (status === 'unauthenticated') {
    router.replace('/auth');
  }

  return (
    <>
      <UserProfile />
    </>
  );
}

export default ProfilePage;
