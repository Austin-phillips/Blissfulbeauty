import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider'
import './Footer.css'
import { Link, withRouter } from 'react-router-dom';

class Footer extends Component {

  render() {
    return (
      <div id="footerContainer">
        <div id="footerInnerContainer">
          <div id="footerContact">
            Contact Information<br/>
            <div id="contactOptions">
              <a id="mailTo" href="mailto:blissful4beauty@gmail.com">blissful4beauty@gmail.com </a><br/>
              <a id="mailTo" href="https://www.beautycounter.com/jaidenkallas?countryid=1&lang=en" target="_blank" rel="noopener noreferrer">Beauty Counter</a>
            </div>
          </div>
          <div id="footerSocials">
            <a href="https://www.instagram.com/kallas.beauty/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/kallas.beauty/?ref=br_rs" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-square"></i></a>
          </div>
          <div id="footerLinks">
            <p>
              <Link id="individualLink" to='/'>Home</Link> /  
              <Link id="individualLink" to='/services'> Services</Link> / 
              <Link id="individualLink" to='/gallery'> Gallery</Link> / 
              <Link id="individualLink" to='/appointments'> Appointments</Link>
            </p>
          </div>
          <Divider id="footerDivider" />
          <div id="copyright">
            &copy; Copyright 2019 | All rights reserved | BlissfulBeauty
          </div>
        </div>
      </div>
    )
  }
};

export default withRouter(Footer);