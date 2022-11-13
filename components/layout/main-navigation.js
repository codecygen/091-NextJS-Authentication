import Link from 'next/link';

// We will use useSession hook to keep the user logged in.
import { useSession, signOut } from 'next-auth/react';

import classes from './main-navigation.module.css';

function MainNavigation() {
  // loading tells next.js if we are currently
  // logged in or not.
  const { data: session, status } = useSession();

  // Status tells us if we are authenticated
  // console.log(status);
  // log 1: unauthenticated
  // log 2: loading
  // log 3: loading
  // log 4: authenticated

  // session tells us the lifetime of the cookie created
  // also the user id.
  // console.log(session);
  // log 1: null
  // log 2: undefined
  // log 3: {user: {…}, expires: '2022-12-12T05:23:35.321Z'}
  // log 4: {user: {…}, expires: '2022-12-12T05:23:35.321Z'}

  function logoutHandler() {
    // signOut deletes the session token
    signOut();
  };

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>

          {
            !session &&
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          }

          {
            session &&
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          }

          {
            session &&
            <li>
              <Link href='/profile2'>Profile 2</Link>
            </li>
          }

          {
            session &&
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          }

        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
