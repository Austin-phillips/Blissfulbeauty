import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import auth0Client from '../../Auth';
import MenuSlide from './Menu'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { clearUser } from '../../actions/user';
import { connect } from 'react-redux';
import './NavBar.css'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavBar extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  signIn = () => {
    const { cookies } = this.props;
    const currentRouteName = window.location.pathname
    const pathname = currentRouteName;
    cookies.set('pathname', `${pathname}`, { path: '/' })
    auth0Client.signIn()
  }

  signOut = () => {
    this.props.dispatch(clearUser())
    auth0Client.signOut();
    this.props.history.replace('/');
  };

  rightNavs = () => {
    const { isAuthenticated } = this.props.user
    if (isAuthenticated) {
      return (
      <div>
        <MenuItem onClick={() => this.signOut()}>Sign Out</MenuItem>
      </div>
      )}
      return (
        <MenuItem onClick={ () => this.signIn()}>Sign In</MenuItem>
      )
  }

  render() {
    const { classes, user } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar id='NavBar' position="static">
          <Toolbar>
            <MenuSlide user={user} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <div id='NavBrand'>
                BlissfulBeauty
              </div>
            </Typography>
            {auth && (
              <div>
                { user.isAuthenticated ? user.profile.name : null}
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                {this.rightNavs()}
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { user: state.user}
}

export default withCookies(connect(mapStateToProps)(withStyles(styles)(NavBar)));