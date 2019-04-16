import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Callback from '../Callback';
import auth0Client from '../Auth';
import Home from './Home/Home';
import Service from './Services/Services';
import Appointments from './Appointments/Appointments';
import Gallery from './Gallery/Gallery';
import Schedule from './Schedule/Schedule';
import UpdateService from './Services/UpdateService';
import Flash from './Flash/Flash';
import './App.css'
import Footer from './Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Flash />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/services' component={Service}/>
            <Route exact path='/appointments' component={Appointments}/>
            <Route exact path='/gallery' component={Gallery}/>
            <Route exact path='/schedule' component={Schedule}/>
            <Route exact path='/services/:id' component={UpdateService}/>
            <Route exact path='/callback' component={Callback} />
            {/* <SecuredRoute path='/new-question'
              component={NewQuestion}
              checkingSession={this.state.checkingSession} /> */}
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
