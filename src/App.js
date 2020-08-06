import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login/Login';
import Blad from './components/blad/Blad';
import Bels from './components/bels/Bels';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import './App.css';

const App = props => {

  const { onAutoLogin } = props
  useEffect(() => {
    onAutoLogin();
  }, [onAutoLogin]);

  let routes;

  if (props.token) {
    if (props.userId === 'beli') {
      routes = (<Switch>
        <Route path='/beli' component={Bels} />;
        <Redirect to='/beli' />
      </Switch>)
    } else {
      routes = (<Switch>
        <Route path='/blad' component={Blad} />;
        <Redirect to='/blad' />
      </Switch>)
    }
  } else {
    routes = (
      <Switch>
        <Route path='/' exact component={Login} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Fragment>
      {routes}
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.login.userId,
    token: state.login.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
