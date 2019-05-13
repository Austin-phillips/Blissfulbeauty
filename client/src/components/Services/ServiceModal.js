import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { addAppointment } from '../../actions/appointments';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import './Service.css'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    borderRadius: '20px',
    maxHeight: '60vh',
    overflow: 'auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  grid: {
    width: '60%',
  },
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

const available = [
  { key: '1', text: '10:00 AM', value: '10:00 AM', disabled: false },
  { key: '2', text: '10:15 AM', value: '10:15 AM', disabled: false },
  { key: '3', text: '10:30 AM', value: '10:30 AM', disabled: false },
  { key: '4', text: '10:45 AM', value: '10:45 AM', disabled: false },
  { key: '5', text: '11:00 AM', value: '11:00 AM', disabled: false },
  { key: '6', text: '11:15 AM', value: '11:15 AM', disabled: false },
  { key: '7', text: '11:30 AM', value: '11:30 AM', disabled: false },
  { key: '8', text: '11:45 AM', value: '11:45 AM', disabled: false },
  { key: '9', text: '12:00 PM', value: '12:00 PM', disabled: false },
  { key: '10', text: '12:15 PM', value: '12:15 PM', disabled: false },
  { key: '11', text: '12:30 PM', value: '12:30 PM', disabled: false },
  { key: '12', text: '12:45 PM', value: '12:45 PM', disabled: false },
  { key: '13', text: '1:00 PM', value: '1:00 PM', disabled: false },
  { key: '14', text: '1:15 PM', value: '1:15 PM', disabled: false },
  { key: '15', text: '1:30 PM', value: '1:30 PM', disabled: false },
  { key: '16', text: '1:45 PM', value: '1:45 PM', disabled: false },
  { key: '17', text: '2:00 PM', value: '2:00 PM', disabled: false },
  { key: '18', text: '2:15 PM', value: '2:15 PM', disabled: false },
  { key: '19', text: '2:30 PM', value: '2:30 PM', disabled: false },
  { key: '20', text: '2:45 PM', value: '2:45 PM', disabled: false },
  { key: '21', text: '3:00 PM', value: '3:00 PM', disabled: false },
  { key: '22', text: '3:15 PM', value: '3:15 PM', disabled: false },
  { key: '23', text: '3:30 PM', value: '3:30 PM', disabled: false },
  { key: '24', text: '3:45 PM', value: '3:45 PM', disabled: false },
  { key: '25', text: '4:00 PM', value: '4:00 PM', disabled: false },
  { key: '26', text: '4:15 PM', value: '4:15 PM', disabled: false },
  { key: '27', text: '4:30 PM', value: '4:30 PM', disabled: false },
];

function getSteps() {
  return ['Fill Out Personal Information', 'Select Date and Time', 'Confirm'];
}

class ServiceModal extends React.Component {
  state = {
    open: false,
    service: this.props.service.name,
    price: this.props.service.price,
    length: this.props.service.length,
    selectedDate: null,
    time: '',
    first: '',
    last: '',
    email: this.props.user.profile.email,
    uid: this.props.user.profile.sub,
    dayOfWeek: '',
    notes: '',
    number: '',
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  getStepContent = (step) => {
  const { classes } = this.props;
  const { email, selectedDate, first, last, service, time, price, length, number } = this.state;
  switch (step) {
    case 0:
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="standard-required"
            label="First Name"
            className={classes.textField}
            value={this.state.first}
            onChange={this.handleChange('first')}
            margin="normal"
          />
          <TextField
            id="standard-required"
            label="Last Name"
            className={classes.textField}
            value={this.state.last}
            onChange={this.handleChange('last')}
            margin="normal"
          />
          <TextField
            id="standard-read-only-input"
            label="Email"
            value={email}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="standard-required"
            label="Phone Number"
            className={classes.textField}
            value={this.state.number}
            onChange={this.handleChange('number')}
            margin="normal"
          />
        </form>
      )
    case 1:
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              margin="normal"
              label="Date picker"
              value={selectedDate}
              onChange={this.handleDateChange}
              className={classes.textField}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="standard-required"
            select
            label="Select"
            className={classes.textField}
            value={this.state.time}
            onChange={this.handleChange('time')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select a time"
            margin="normal"
          >
            {available.map(a => (
              <MenuItem key={a.key} value={a.text} disabled={a.disabled}>
                {a.text}
              </MenuItem>
            ))}
          </TextField>
        </form>
      )
    case 2:
      return (
        <div id="serviceModalText">
          <p>{`Name: ${first} ${last}`}</p>
          <p>{`Phone Number: ${number} `}</p>
          <p>{`Service: ${service}`}</p>
          <p>{`Date: ${moment(selectedDate).format('MM/DD/YY')} at ${time}.`}</p>
          <p>{`Price: $${price}.00`}</p>
          <p>{`Length: ${length} min`}</p>
        </div>
      )
    default:
      return 'Unknown step';
  }
}

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, first: '', last: '', selectedDate: null, time: '', number: '', activeStep: 0 });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDateChange = selectedDate => {
    const dayOfWeek = moment(selectedDate).format('dddd')
    const daysOff = ["Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"]
    available.forEach((time) => {
      if (time.disabled === true) {
        time['disabled'] = false
      }
    })
    this.setState({ selectedDate: selectedDate, time: ''});
    if (daysOff.indexOf(dayOfWeek) !== -1) {
      available.forEach((time) => {
        time['disabled'] = true;
      })
    } else {
      this.HandleDisabled(selectedDate)
    }  
  };

  HandleDisabled = (date) => {
    const { appointments } = this.props;
    const last = available.length -1
    const { length } = this.state;

    appointments.forEach((app) => available.forEach((time, index, array) => {
      
      var half = index + 1 <= last ? array[index + 1] : time
      var fourtyFive = index + 2 <= last ? array[index + 2] : time
      var hour = index + 3 <= last ? array[index + 3] : time
      var hourFifteen = index + 4 <= last ? array[index + 4] : time
      var hourHalf = index + 5 <= last ? array[index + 5] : time
      var hourfourtyFive = index + 6 <= last ? array[index + 6] : time
      var twoHour = index + 7 <= last ? array[index + 7] : time
      var twoHourFifteen = index + 8 <= last ? array[index + 8] : time
      var twoHourHalf = index + 9 <= last ? array[index + 9] : time
      var backHalf = index - 1 >= 0 ? array[index - 1] : time
      var backFourtyFive = index - 2 >= 0 ? array[index - 2] : time
      var backHour = index - 3 >= 0 ? array[index - 3] : time
      var backHourFifteen = index - 4 >= 0 ? array[index - 4] : time
      var backHourHalf = index - 5 >= 0 ? array[index - 5] : time
      var backHourfourtyFive = index - 6 >= 0 ? array[index - 6] : time
      var backTwoHour = index - 7 >= 0 ? array[index - 7] : time
      var backTwoHourFifteen = index - 8 >= 0 ? array[index - 8] : time
      var backTwoHourHalf = index - 9 >= 0 ? array[index - 9] : time

      function checkCurrentLength() {
        if (length === 30) {
          return(
            backHalf['disabled'] = true
          )
        } else if (length === 60) {
          return(
            backHalf['disabled'] = true,
            backFourtyFive['disabled'] = true,
            backHour['disabled'] = true
          )
        } else if ( length === 90) {
          return(
            backHalf['disabled'] = true,
            backFourtyFive['disabled'] = true,
            backHour['disabled'] = true,
            backHourFifteen['disabled'] = true,
            backHourHalf['disabled'] = true
          )
        } else if ( length === 120) {
          return(
            backHalf['disabled'] = true,
            backFourtyFive['disabled'] = true,
            backHour['disabled'] = true,
            backHourFifteen['disabled'] = true,
            backHourHalf['disabled'] = true,
            backHourfourtyFive['disabled'] = true,
            backTwoHour['disabled'] = true
          )
        } else if ( length === 150) {
          return(
            backHalf['disabled'] = true,
            backFourtyFive['disabled'] = true,
            backHour['disabled'] = true,
            backHourFifteen['disabled'] = true,
            backHourHalf['disabled'] = true,
            backHourfourtyFive['disabled'] = true,
            backTwoHour['disabled'] = true,
            backTwoHourFifteen['disabled'] = true,
            backTwoHourHalf['disabled'] = true
          )
        }
      }
      if (app.date === moment(date).format("MM/DD/YY") && app.time === time['text']) {
        if (app.length === 30){
          time['disabled'] = true
          half['disabled'] = true
          checkCurrentLength()
        } else if (app.length === 60) {
          time['disabled'] = true
          half['disabled'] = true
          fourtyFive['disabled'] = true
          hour['disabled'] = true
          checkCurrentLength()
        } else if (app.length === 90) {
          time['disabled'] = true
          half['disabled'] = true
          fourtyFive['disabled'] = true
          hour['disabled'] = true
          hourFifteen['disabled'] = true
          hourHalf['disabled'] = true
          checkCurrentLength()
        } else if (app.length === 120) {
          time['disabled'] = true
          half['disabled'] = true
          fourtyFive['disabled'] = true
          hour['disabled'] = true
          hourFifteen['disabled'] = true
          hourHalf['disabled'] = true
          hourfourtyFive['disabled'] = true
          twoHour['disabled'] = true
          checkCurrentLength()
        } else if (app.length === 150) {
          time['disabled'] = true
          half['disabled'] = true
          fourtyFive['disabled'] = true
          hour['disabled'] = true
          hourFifteen['disabled'] = true
          hourHalf['disabled'] = true
          hourfourtyFive['disabled'] = true
          twoHour['disabled'] = true
          twoHourFifteen['disabled'] = true
          twoHourHalf['disabled'] = true
          checkCurrentLength()
        } else {
          time['disabled'] = true
          checkCurrentLength()
        }
      }
    }))
  }

  buttonDisabled = (step) => {
    const { first, last, email, number, selectedDate, time } = this.state;

    if (step === 0){
      if (first, last, email, number === '') return true;
      else if (number.match((/[a-z]/i))) return true;
    } else if (step === 1) {
      if (selectedDate, time === '') return true;
    }
  }

  handleSubmit = (e) => {
    this.handleNext()
    const { dispatch } = this.props;
    const { first, last, selectedDate, time, service, email, notes, length, uid, price, number } = this.state;
    const date = moment(selectedDate).format("MM/DD/YY")
    const filteredNumber = number.replace(/\D/g, '')
    const formattedTime = moment(time, "h:mm A").format("hh:mm A")
    dispatch(addAppointment({ first, last, date, formattedTime, service, email, notes, length, uid, price, filteredNumber }));
    this.setState({ first: '', last: '', selectedDate: null, time: '', number: '' });
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, first, last } = this.state;

    return (
      <div>
          <Button id='bookButton' onClick={this.handleOpen}>Book Appointment</Button>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div className={classes.root}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      {this.getStepContent(index)}
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          {activeStep === steps.length - 1 ? 
                          <Button
                            disabled={this.buttonDisabled(activeStep)}
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            className={classes.button}
                          > 
                            Finished
                          </Button> :
                          <Button
                            disabled={this.buttonDisabled(activeStep)}
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                          Next
                          </Button>
                        }
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>{`Thank You ${first} ${last} for booking.`}</Typography>
                  <Typography>{`You will recieve a text shortly with your appt. information.`}</Typography>
                </Paper>
              )}
              <Button id="cancelButton" onClick={this.handleClose}>Close</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

ServiceModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { appointments: state.appointments, user: state.user}
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(ServiceModal);

export default connect(mapStateToProps)(SimpleModalWrapped);