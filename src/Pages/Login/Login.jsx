import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import logo from '../../assets/logo.png'

const Login = () => {

  const [signState, setSignState] = useState(() => {
    return localStorage.getItem("signState") || 'Sign In' ;
  })

  // Save to localStorage whenever signState changes
  useEffect(() => {
    localStorage.setItem('signState',signState)
    console.log('useEffect updates localStorage', signState)
  },[signState])

  const handleSignState = () => {
    setSignState(prev => (prev === "Sign In" ? "Sign Up" : "Sign In"));
  };
  

  return (
    <div className={styles['signup']}>
      <img src={logo} alt="" className={styles["signup__logo"]} />

      <div className={styles["signup__form"]}>
        <h1 className={styles["signup__title"]}>{signState}</h1>

        <form action="" className={styles["signup__form-container"]}>
          {/* Only show name field if user is signing up */}
          {signState === "Sign Up" ?
            <input type="text" name="name" placeholder='Your name' className={styles["signup__input"]} />
            : null
          }
          <input type="email" name="email" placeholder='Email' className={styles["signup__input"]} />
          <input type="password" name="password" placeholder='Password' className={styles["signup__input"]} />
          <button type='button' className={styles['signup__btn']}>{signState}</button>

          <div className={styles["signup__help"]}>
            <div className={styles["signup__remember"]}>
              <input type="checkbox" id='remember' name="checkbox" className={styles["signup__checkbox"]} />
              <label htmlFor="remember" className={styles["signup__checkbox-text"]}>Remember Me</label>
            </div>
            <p className={styles["signup__help-text"]}>Need Help?</p>
          </div>

        </form>

        <div className={styles["auth-toggle"]}>
          <p className={styles["auth-toggle__text"]}>
            {signState === "Sign In" ? "New to Netflix?" : "Already have account?"}
            <span className={styles["auth-toggle__link"]} onClick={handleSignState}>
              {signState === "Sign In" ? "Sign Up Now" : "Sign In Now"}
            </span>
          </p>
        </div>


      </div>
    </div>
  );
};

export default Login;

