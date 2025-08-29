import React from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      {/* Navbar left section */}
      <div className={styles["navbar-left"]}>
        <img src={logo} alt="Netflix logo" className={styles['netflix__logo']} />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>

      {/* Navbar right section */}
      <div className={styles["navbar__right"]}>
        <img src={search_icon} alt="Search icon" className={styles["navbar__icon"]} />
        <p className={styles["navbar__right-text"]}>Children</p>
        <img src={bell_icon} alt="Bell icon" className={styles["navbar__icon"]} />

        <div className={styles["navbar__profile"]}>
          <img src={profile_img} alt="Profile image" className={styles["navbar__profile-img"]} />
          <img src={caret_icon} alt="Caret icon" className={styles["navbar__profile-caret"]} />
          <div className={styles["navbar__dropdown"]}>
            <p>Sign out from Netflix</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar
