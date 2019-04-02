import React from 'react';
import { connect } from 'react-redux';
import { clearFlash } from '../../actions/flash';
import SnackBar from './SnackBar';

class Flash extends React.Component {

  fadeFlash = () => {
    setTimeout(() => {
      this.props.dispatch(clearFlash());
    }, 15000);
  }

  displayFlash = () => { 
    const { flash } = this.props;
    this.fadeFlash()
    return(
      <SnackBar flash={flash} />
    )
  };

  render() {
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