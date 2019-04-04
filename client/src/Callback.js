import React, { Component } from 'react';
import auth0Client from './Auth';
import { withRouter } from 'react-router-dom';
import { setUser } from './actions/user';
import { connect } from 'react-redux'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Callback extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  async componentDidMount() {
    const { cookies } = this.props
    const pathname = cookies.get('pathname')
    await auth0Client.handleAuthentication();
    await this.props.dispatch(setUser(auth0Client.getProfile()))
    this.props.history.replace(pathname);
    this.deleteCookie()
  }

  deleteCookie = () => {
    const { cookies } = this.props;
    cookies.remove('pathname')
  }

  render() {
    return (
      <p>Loading</p>
    );
  }
}

export default withCookies(connect()(withRouter(Callback)));