import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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
});

class UpdateAppointment extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { service, price, length, selectedDate, formattedTime, first, last, email, uid, notes, filteredNumber, status } = this.state;
    const time = moment(formattedTime, "hh:mm A").format("h:mm A")

    return (
      <div>
        <IconButton id='addButton' onClick={this.handleOpen} aria-label="add">
          <AddIcon />
        </IconButton>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant='h5' align='center'>Add Image</Typography>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <IconButton id='addButton' aria-label="add">
                      <AddIcon />
                    </IconButton>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </Modal>
      </div>
    );
  }
}

UpdateAppointment.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { images: state.images, user: state.user }
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(UpdateAppointment);

export default connect(mapStateToProps)(SimpleModalWrapped);