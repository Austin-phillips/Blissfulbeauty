import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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