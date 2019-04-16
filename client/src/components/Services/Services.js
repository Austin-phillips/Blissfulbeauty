import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ServiceCard from './ServiceCard';
import Typography from '@material-ui/core/Typography';
import './Service.css';
import { ROLE_URL } from '../../Secrets/env';
import { connect } from 'react-redux';
import CreateService from './CreateService';
import { Divider } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    marginTop: '50px',
  }
});

function Services(props) {
  const { classes, user, location } = props;
  const profile = user.profile
  const role = user.isAuthenticated ? profile[ROLE_URL] : null

  return (
    <div id="servicesContainer">
      <Typography id="servicesHeader" align='center' variant="h4" gutterBottom>
        Services
      </Typography> 
      <Divider id="servicesDivider" />
      {user.isAuthenticated && role[0] === 'admin' ? <CreateService /> : null}
      <ServiceCard location={location.pathname} />
    </div>
  );
}

Services.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(withStyles(styles)(Services));