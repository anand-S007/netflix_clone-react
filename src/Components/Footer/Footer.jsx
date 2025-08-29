import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer__icons">
        <img src={facebook_icon} alt="Youtube icon" className="footer__icons-img" />
        <img src={instagram_icon} alt="Instagram icon" className="footer__icons-img" />
        <img src={twitter_icon} alt="Twitter icon" className="footer__icons-img" />
        <img src={youtube_icon} alt="Youtube icon" className="footer__icons-img" />
      </div>
      <ul className='footer__link'>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Inverstor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Informations</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright__text">© 1997-2025 Netflix, Inc.</p>
    </div>
  )
}

export default Footer
