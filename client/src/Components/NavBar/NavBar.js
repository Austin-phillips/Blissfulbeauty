import React, { Component } from 'react';
import auth0Client from '../../Auth';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, NavItem, SideNav, SideNavItem, Button } from 'react-materialize';
import './NavBar.css';

class NavBar extends Component {

  signOut = () => {
    auth0Client.signOut();
    this.props.history.replace('/');
  };

  rightNavs = () => {
    if (auth0Client.isAuthenticated()){
    return (
      <div>
        <SideNavItem>Logged in as:</SideNavItem>
        <SideNavItem>{auth0Client.getProfile().name}</SideNavItem>
        <Button onClick={() => this.signOut()}>Logout</Button>
      </div>
    )};
    return (
      <Button onClick={auth0Client.signIn}>Sign in</Button>
    )
  };

  adminNav = () => {
    const profile = auth0Client.getProfile();
    const role = profile['https://example.com/roles']

    if (role[0] === 'admin') {
      return(
        <SideNavItem waves href='#!third' icon='view_agenda'>View Schedule</SideNavItem>
      );
    };
  };

  render() {
    return(
      <div>
        <Navbar id='NavBar' brand='BlissfulBeauty' left>
          <SideNav
            trigger={<div id='MenuButtonContainer'><Button id='MenuButton'>Menu</Button></div>}
            options={{ closeOnClick: true }}
          >  
          {this.rightNavs()}
            <SideNavItem divider />
            <SideNavItem icon='spa'><Link to='/services'>Services</Link></SideNavItem>
            <SideNavItem icon='book'><Link to='/services'>Appointments</Link></SideNavItem>
            <SideNavItem icon='collections'><Link to='/services'>Photo Gallery</Link></SideNavItem>
            {auth0Client.isAuthenticated() ? this.adminNav() : null}
          </SideNav>
        </Navbar>
      </div>
    )
  }
};

export default withRouter(NavBar);