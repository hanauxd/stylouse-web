import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SignIn, SignUp, Home, ProductDetail, Cart, Profile, OrderHistory } from './screens';
import { Toolbar } from './components';

import styles from './Root.module.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Shipping from './screens/cart/shipping/Shipping';

const Root = props => {
  const [isOpen, setOpen] = useState(false);

  const isOpenToggle = () => {
    setOpen(prevOpen => !prevOpen);
  }

  return (
    <div className={styles.root__div}>
      <Router>
        <Toolbar isOpen={isOpen} setOpen={isOpenToggle} />
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
            <Route path='/products/:id'>
              <ProductDetail />
            </Route>
            <Route path='/cart' exact>
              <Cart />
            </Route>
            <Route path='/checkout' exact>
              <Shipping />
            </Route>
            <Route path='/user' exact>
              <Profile />
            </Route>
            <Route path='/orders' exact>
              <OrderHistory />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default Root;