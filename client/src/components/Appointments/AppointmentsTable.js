import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { getUserAppointments } from '../../actions/appointments';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class AppointmentsTable extends React.Component{
  state = { id: this.props.user.isAuthenticated ? this.props.user.profile.sub : 0}

  componentDidMount() {
    const { dispatch, user } = this.props;
    const { id } = this.state
    if (user.isAuthenticated) {
      dispatch(getUserAppointments(id))
    } else 
    return null
  }

  handleTableCells = () => {
    const { user, appointments } = this.props;

    if (user.isAuthenticated) {
      if (appointments.any) {
        return appointments.appointments.map(a => {
          return(
            <TableRow key={a.id}>
              <TableCell component="th" scope="row">
                {a.first} {a.last}
              </TableCell>
              <TableCell align="right">{a.date}</TableCell>
              <TableCell align="right">{a.time}</TableCell>
              <TableCell align="right">{a.service}</TableCell>
              <TableCell align="right">${a.price}.00</TableCell>
            </TableRow>
          )
        })
      } else {
        return (
          <TableRow>
            <TableCell>No Appointments.</TableCell>
          </TableRow>
        )
      }
    } else {
      return (
        <TableRow>
          <TableCell>
            Sign In To View
          </TableCell>
        </TableRow>
      )
    }
  }

  render() {
  const { classes } = this.props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Service</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.handleTableCells()}
        </TableBody>
      </Table>
    </Paper>
  )};
}

AppointmentsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { 
      appointments: state.userAppointments,
      user: state.user
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AppointmentsTable));