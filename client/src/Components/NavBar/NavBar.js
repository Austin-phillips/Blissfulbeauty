import React, { Component } from 'react';
import { Navbar, NavItem, SideNav, SideNavItem, Button } from 'react-materialize';
import './NavBar.css';
import auth0Client from '../../Auth';

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
            trigger={<Button>Menu</Button>}
            options={{ closeOnClick: true }}
          >  
          {this.rightNavs()}
            <SideNavItem divider />
            <SideNavItem href='#!icon' icon='spa'>Services</SideNavItem>
            <SideNavItem href='#!second' icon='book'>Book an Appointment</SideNavItem>
            <SideNavItem waves href='#!third' icon='collections'>View Photos</SideNavItem>
            {auth0Client.isAuthenticated() ? this.adminNav() : null}
          </SideNav>
        </Navbar>
      </div>
    )
  }
};

export default NavBar;