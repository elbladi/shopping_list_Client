import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login/Login';
// import Blad from './components/blad/Blad';
// import Bels from './components/bels/Bels';
import User from './components/user/User';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import './App.css';

const App = props => {

  const { onAutoLogin } = props
  useEffect(() => {
    onAutoLogin();
  }, [onAutoLogin]);

  let routes = (
    <Switch>
      <Route path='/' exact component={Login} />
      <Redirect to='/' />
    </Switch>
  )

  if (props.token) {
    routes = (
      <Switch>
        <Route path='/list' component={User} />;
        <Redirect to='/list' />
      </Switch>)
  }

  return (
    <Fragment>
      {routes}
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    token: state.login.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
