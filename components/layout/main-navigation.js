import Link from 'next/link';

// We will use useSession hook to keep the user logged in.
import { useSession } from 'next-auth/react';

import classes from './main-navigation.module.css';

function MainNavigation() {
  // loading tells next.js if we are currently
  // logged in or not.
  const { data: session, status } = useSession();

  // Status tells us if we are authenticated
  console.log(status);
  // session tells us the lifetime of the cookie created
  // also the user id.
  console.log(session);

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/auth'>Login</Link>
          </li>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
