import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaSquareInstagram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  
  return(

    <footer>
    <div className="footerMain">
      <div className="appDescription">
        <div className="appAboutHead">
          <h4>About</h4>
          <p className="appAbout">the world's largest online bus ticket booking service trusted by over 25 million happy customers globally</p>
        </div>
        <div className="appInfo">
          <h4>Info</h4>
          <div className="appInfoLink">
            <a href="/contact">Contact</a>
            <a href="t&c">T&C</a>
            <a href="privacy">Privacy & Policy</a>
          </div>
        </div>
        <div className="appInfo">
          <h4>Global Sites</h4>
          <div className="appInfoLink">
            <a href="/indiA">India</a>
            <a href="/">UAE</a>
            <a href="privacy">USA</a>
          </div>
        </div>
      </div>
      <div className="socialAccounts">
        <FaSquareInstagram className="SocialChild" />
        <CiFacebook className="SocialChild" />
        <FaTwitter className="SocialChild" />
      </div>
    </div>
  </footer>
       
  )
}

export default Footer