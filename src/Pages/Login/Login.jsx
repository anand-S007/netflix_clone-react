// import { useEffect, useState } from 'react'
// import styles from './Login.module.css'
// import logo from '../../assets/logo.png'
// import { login, signUp } from '../../firebase/auth'

// const Login = () => {

//   // State hooks
//   const [signState, setSignState] = useState(() => {
//     return localStorage.getItem("signState") || 'Sign In';
//   })
//   const [name, setName] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [password, setPassword] = useState(null);
//   const [loading, setLoading] = useState(false)

//   const user_auth = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Start spinner

//     try {
//       if (signState === "Sign In") {
//         const {error } = await login(email, password);
//         if (error) alert("Error while Sign in,",error);
//       } else {
//         const {error } = await signUp(name, email, password);
//         if (error) alert("Error while Sign up",error);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false); // Stop spinner
//     }
//   };


//   // Save to localStorage whenever signState changes
//   useEffect(() => {
//     localStorage.setItem('signState', signState)
//   }, [signState])

//   const handleSignState = () => {
//     setSignState(prev => (prev === "Sign In" ? "Sign Up" : "Sign In"));
//   };

//   return (
//     <div className={styles['signup']}>
//       <img src={logo} alt="" className={styles["signup__logo"]} />

//       <div className={styles["signup__form"]}>
//         <h1 className={styles["signup__title"]}>{signState}</h1>

//         {/* Form fields */}
//         <form action="" className={styles["signup__form-container"]}>
//           {/* Only show name field if user is signing up */}
//           {signState === "Sign Up" ?
//             <input type="text" name="name" placeholder='Your name'
//               className={styles["signup__input"]}
//               value={name} onChange={(e) => { setName(e.target.value) }} />
//             : null
//           }
//           <input type="email" name="email" placeholder='Email'
//             className={styles["signup__input"]}
//             value={email} onChange={(e) => { setEmail(e.target.value) }} />
//           <input type="password" name="password" placeholder='Password'
//             className={styles["signup__input"]}
//             value={password} onChange={(e) => { setPassword(e.target.value) }} />
//           <button
//             type='submit'
//             className={styles['signup__btn']}
//             onClick={user_auth}
//             disabled={loading}>
//             {loading ? <span className={styles.loader}></span> : signState}
//           </button>

//           <div className={styles.signup__help}>
//             <div className={styles["signup__remember"]}>
//               <input type="checkbox" id='remember' name="checkbox" className={styles.signup__checkbox} />
//               <label htmlFor="remember" className={styles.signup__checkbox__text}>Remember Me</label>
//             </div>
//             <p className={styles["signup__help__text"]}>Need Help?</p>
//           </div>
//         </form>

//         <div className={styles.auth__toggle}>
//           <p className={styles["auth-toggle__text"]}>
//             {signState === "Sign In" ? "New to Netflix?" : "Already have account?"}
//             <span className={styles.auth__toggle__link} onClick={handleSignState}>
//               {signState === "Sign In" ? "Sign Up Now" : "Sign In Now"}
//             </span>
//           </p>
//         </div>


//       </div>
//     </div>
//   );
// };

// export default Login;


import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import logo from '../../assets/logo.png';
import { login, signUp } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom'; // For navigation after successful auth

const Login = () => {
  const navigate = useNavigate();

  const [signState, setSignState] = useState(() =>
    localStorage.getItem('signState') || 'Sign In'
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Reset form data when toggling between Sign In / Sign Up
  const handleSignStateToggle = () => {
    setSignState((prev) => (prev === 'Sign In' ? 'Sign Up' : 'Sign In'));
    setErrorMessage('');
    setFormData({ name: '', email: '', password: '' }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const { name, email, password } = formData;

    if (!email || !password || (signState === 'Sign Up' && !name)) {
      setErrorMessage('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      let authResult
      if (signState === 'Sign In') {
        authResult = await login(email, password);  
      } else {
        authResult = await signUp(name, email, password);  
      }

      if (authResult.success && authResult.data?.uid) {
        navigate('/'); // Navigate to home on success
      } else {
        const rawError = authResult.error || 'Unknown error';
        setErrorMessage(rawError
          .replace('Firebase: Error (auth/', '')
          .replace(').', '')
          .replace(/-/g, ' ')
          .trim());
      }
    } catch (err) {
      console.error('Auth unexpected error:', err);
      const message = err.message || 'An unexpected error occurred.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    localStorage.setItem('signState', signState);
  }, [signState]);

  return (
    <div className={styles.signup}>
      <img src={logo} alt="Logo" className={styles.signup__logo} />

      <div className={styles.signup__form}>
        <h1 className={styles.signup__title}>{signState}</h1>

        <form
          onSubmit={handleAuth}
          className={styles.signup__form_container}
        >
          {signState === 'Sign Up' && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className={styles.signup__input}
              value={formData.name}
              onChange={handleInputChange}

            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.signup__input}
            value={formData.email}
            onChange={handleInputChange}

          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.signup__input}
            value={formData.password}
            onChange={handleInputChange}

          />

          {errorMessage && (
            <p className={styles.signup__error}>{errorMessage}</p>
          )}

          <button
            type="submit"
            className={styles.signup__btn}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.loader}></span>
            ) : (
              signState
            )}
          </button>
        </form>

        <div className={styles.signup__help}>
          <div className={styles.signup__remember}>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className={styles.signup__checkbox}
            />
            <label
              htmlFor="remember"
              className={styles.signup__checkbox_text}
            >
              Remember Me
            </label>
          </div>

          <p className={styles.signup__help_text}>Need Help?</p>
        </div>

        <div className={styles.auth__toggle}>
          <p className={styles.auth__toggle__text}>
            {signState === 'Sign In'
              ? 'New to Netflix?'
              : 'Already have an account?'}
            <span
              className={styles.auth__toggle__link}
              onClick={handleSignStateToggle}
            >
              {signState === 'Sign In' ? 'Sign Up Now' : 'Sign In Now'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
