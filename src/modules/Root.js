import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SignIn, SignUp, Home } from './screens';

import styles from './Root.module.css';

const Root = props => {
  return (
    <div className={styles.root__div}>
      <Router>
        <div className={styles.content__div}>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/sign-up' exact>
              <SignUp />
            </Route>
            <Route path='/sign-in' exact>
              <SignIn />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default Root;