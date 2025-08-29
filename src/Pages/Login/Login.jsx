import React from 'react'
import styles from './Login.module.css'
import logo from '../../assets/logo.png'

const Login = () => {
  return (
    <div className={styles['signup']}>
      <img src= {logo} alt="" className={styles["signup__logo"]} />
      <div className={styles["signup__form"]}>
        <h1 className={styles["signup__title"]}>Sign Up</h1>
        <form action="" className= {styles["signup__form-container"]}>
          <input type="text" name="name" placeholder='Your name' className= {styles["signup__input"]} />
          <input type="email" name="email" placeholder='Email' className= {styles["signup__input"]}/>
          <input type="password" name="password" placeholder='Password' className= {styles["signup__input"]}/>
          <button className={styles['signup__btn']}>Sign Up</button>
          <div className={styles["signup__help"]}>
            <div className="signup__remember">
              <button type='checkbox' className='signup__checkbox'>Sign Up</button>
              <label htmlFor="" className={styles["signup__checkbox-text"]}>Remember Me</label>
            </div>
            <p className={styles["signup__help-text"]}>Need Help?</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
