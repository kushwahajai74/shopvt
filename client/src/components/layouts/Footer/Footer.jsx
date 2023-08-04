import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>shopEkart</h1>
        <p>High Quality is our priority</p>
        <p>Copyrights 2023 &copy; Jai Kushwaha</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a target="#" href="https://www.instagram.com/jaikushwaha_">
          Instagram
        </a>
        <a target="#" href="https://linkedin.com/in/kushwahajai74">
          LinkedIn
        </a>
        <a target="#" href="https://twitter.com/kushwahajai74">
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
