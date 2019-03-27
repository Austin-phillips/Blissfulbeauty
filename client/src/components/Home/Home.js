import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../../Auth';

class Home extends Component {

  render() {
    return(
      <div>
        <h1>The Home Page</h1>
      </div>
    )
  }
};

export default withRouter(Home);