import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServices } from '../../actions/services'

class Service extends Component {
  state = { loading: true}

  componentDidMount() {
    this.props.dispatch(getServices())
  };

  setServices = () => {
    const { services } = this.props;

    return services.map( s => {
      return(
        <ul key={s.id}>
          <li>Name: {s.name}</li>
          <li>Description: {s.description}</li>
          <li>Price: ${s.price}.00</li>
        </ul>
      )
    })
  };

  render() {
    return (
      <div>
        <h1>Services</h1>
        {this.setServices()}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return { services: state.services }
}

export default connect(mapStateToProps)(Service);