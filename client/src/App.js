import React, { useEffect, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/register' component={Register} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
