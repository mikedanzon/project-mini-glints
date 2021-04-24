import React from 'react';
import Logo from '../assets/img/logo.png';
import Gplay from '../assets/img/small-icons/gplay.png';
import Apple from '../assets/img/small-icons/apple.png';
import Fb from '../assets/img/small-icons/fb.webp';
import Pinterest from '../assets/img/small-icons/pint.png';
import Ig from '../assets/img/small-icons/ig.webp';

function Footer() {
  return (
    <div className="footer-mini">
      <div className="footer-mini-top">
        <div className="footer-mini-top-1">
          <div className="footer-mini-top-1-1">
            <a href="/">
              <img src={Logo} alt="Logo" />
            </a>
          </div>
          <div className="footer-mini-top-1-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
            ducimus praesentium non maxime ab, neque obcaecati cum, harum,
            consequatur doloribus iusto rerum cumque pariatur earum quo. Quis
            itaque est perferendis.
          </div>
        </div>
        <div className="footer-mini-top-2">
          <div className="footer-mini-top-2-about">About Us</div>
          <div className="footer-mini-top-2-blog">Blog</div>
          <div className="footer-mini-top-2-media">Media Center</div>
        </div>
        <div className="footer-mini-top-3">
          <div className="footer-mini-top-3-1">
            <div className="footer-mini-top-3-1-download">Download</div>
            <div className="footer-mini-top-3-1-image">
              <a href="https://play.google.com" target="blank">
                <img src={Gplay} alt="gplay" />
              </a>
              <a href="https://apple.com" target="blank">
                <img src={Apple} alt="apple" />
              </a>
            </div>
          </div>
          <div className="footer-mini-top-3-2">
            <div className="footer-mini-top-3-2-social">Social Media</div>
            <div className="footer-mini-top-3-2-image">
              <a href="https://facebook.com" target="blank">
                <img className="mr-3" src={Fb} alt="social" />
              </a>
              <a href="https://instagram.com" target="blank">
                <img className="mr-3" src={Ig} alt="social" />
              </a>
              <a href="https://pinterest.com" target="blank">
                <img src={Pinterest} alt="social" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-mini-border"></div>
      <div className="footer-mini-copyright">
        Copyright © 2021 MilanTV. All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
