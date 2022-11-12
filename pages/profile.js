import { useSession } from 'next-auth/react';

import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>
  }
  
  if (status === 'unauthenticated') {
    return <p>Please Login!</p>
  }

  return <UserProfile />;
}

export default ProfilePage;
