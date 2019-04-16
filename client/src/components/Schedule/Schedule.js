import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ScheduleTable from './ScheduleTable';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    minHeight: '100vh'
  },
  header: {
    marginTop: '25px',
  }
});

class Appointments extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.header} align='center' variant="h2" gutterBottom>
          Schedule
      </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div id='table'>
              <ScheduleTable />
            </div>
          </Grid>
        </Grid>
      </div>
    )
  };
};

Appointments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Appointments);