import { useRef } from 'react';

import classes from './profile-form.module.css';

function ProfileForm() {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function passwordChangeSubmitHandler (e) {
    e.preventDefault();
    console.log('hi');
  };

  return (
    <form className={classes.form} onSubmit={passwordChangeSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
