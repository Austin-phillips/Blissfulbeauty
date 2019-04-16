import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuButton from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SpaIcon from '@material-ui/icons/Spa'
import EventIcon from '@material-ui/icons/Event';
import PhotoIcon from '@material-ui/icons/PhotoLibrary'
import HomeIcon from '@material-ui/icons/Home';
import ScheduleIcon from '@material-ui/icons/Book';
import './NavBar.css'
import { Link, withRouter } from 'react-router-dom';
import { ROLE_URL } from '../../Secrets/env';


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const navOptions = [
  { key: '1', text: 'Home', value: 'Home', href: '/' },
  { key: '2', text: 'Services', value: 'Services', href: '/services' },
  { key: '3', text: 'Appointments', value: 'Appointments', href: '/appointments'},
  { key: '4', text: 'Photo Gallery', value: 'Photo Gallery', href: '/gallery' },
]

class Menu extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  navIcon = (icon) => {
    if (icon === 'Services'){
      return (
        <ListItemIcon>
          <SpaIcon />
        </ListItemIcon>
      )
    } else if (icon === 'Appointments'){
      return (
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
      )
    } else if (icon === 'Photo Gallery'){
      return (
        <ListItemIcon>
          <PhotoIcon />
        </ListItemIcon>
      )
    } else if (icon === 'Home'){
      return (
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
      )
    }
  };

  handleAdmin = () => {
    const { user } = this.props;
    const profile = user.profile;
    const role = profile[ROLE_URL];

    if (role[0] === 'admin'){
      return(
        <div>
          <Divider />
          <Link id="navabarLinks" to='schedule'>
            <ListItem key='admin'>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary='Schedule'/>
            </ListItem>
          </Link>
        </div>
      )
    } else
    return null
  }

  render() {
    const { classes, user } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {navOptions.map(o => {
            return(
              <Link id="navabarLinks" key={o.key} to={o.href}>
                <ListItem >
                  {this.navIcon(o.value)}
                  <ListItemText primary={o.text} />
                </ListItem>
              </Link>
              )
            })
          }
          {user.isAuthenticated ? this.handleAdmin() : null }
        </List>
      </div>
    );

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuButton />
        </IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Menu));