import React from 'react';
import { connect } from 'react-redux';
import { clearFlash } from '../../actions/flash';
import green from '@material-ui/core/colors/green';
import SnackBar from './SnackBar';

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },

  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class Flash extends React.Component {
  state = {
    vertical: 'top',
    horizontal: 'center'
  };

  fadeFlash = () => {
    setTimeout(() => {
      this.props.dispatch(clearFlash());
    }, 15000);
  }

  displayFlash = () => { 
    const { open, vertical, horizontal } = this.state;
    const { flash } = this.props;
    this.fadeFlash()
    return(
      <SnackBar flash={flash} />
    )
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    const { flash } = this.props;
    if (flash.message)
      return (
        <div>
          {this.displayFlash()}
        </div>
      )
     else 
      return null
  };
}

const mapStateToProps = state => {
  return { flash: state.flash };
};

export default connect(mapStateToProps)(Flash);