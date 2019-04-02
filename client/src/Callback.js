import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from './Auth';
import { setUser } from './actions/user';
import { connect } from 'react-redux'

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    await this.props.dispatch(setUser(auth0Client.getProfile()))
    this.props.history.replace('/');
  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default connect()(withRouter(Callback));