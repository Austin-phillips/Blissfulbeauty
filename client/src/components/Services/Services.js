import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ServiceCard from './ServiceCard';
import Typography from '@material-ui/core/Typography';
import './Service.css';
import { ROLE_URL } from '../../Secrets/env';
import { connect } from 'react-redux';
import CreateService from './CreateService';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    marginTop: '25px',
  }
});

function Services(props) {
  const { classes, user, location } = props;
  const profile = user.profile
  const role = user.isAuthenticated ? profile[ROLE_URL] : null

  return (
    <div className={classes.root}>
      <Typography className={classes.header} align='center' variant="h2" gutterBottom>
        Services
      </Typography> 
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {user.isAuthenticated && role[0] === 'admin' ? <CreateService /> : null}
          <ServiceCard location={location.pathname} />
        </Grid>
      </Grid>
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