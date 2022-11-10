import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';

import classes from './auth-form.module.css';


function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  async function createUser(email, password) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }
  
    return data;
  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //==========
    // Add validation for email and password to prevent for front end.
    //==========

    if (isLogin) {
      // Written as 'credentials' as in "./pages/api/auth/[...nextauth].js"
      // authorize method has an argument with the same name which is
      // 'crendentials'. From there, email and password are accessed with
      // credentials.email and credentials.password so we have to specify
      // all of them on the front end.
      const result = await signIn('credentials', {
        redirect: false, 
        email: enteredEmail, 
        password: enteredPassword
      });

      // console.log(result);
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
