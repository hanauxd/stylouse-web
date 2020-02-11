import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SignIn, SignUp, Home, ProductDetail, Cart, Profile, OrderHistory } from './screens';
import { Toolbar } from './components';

import styles from './Root.module.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Shipping from './screens/cart/shipping/Shipping';
import AddProduct from './components/admin/product/AddProduct';
import AddCategory from './components/admin/category/AddCategory';
import { useCustomState } from './helpers/hooks';

const Root = props => {
  const [isOpen, setOpen] = useState(false);

  const isOpenToggle = () => {
    setOpen(prevOpen => !prevOpen);
  }

  // const [state, setState] = useCustomState({
  //   isAuth: false,
  //   userRole: ''
  // })

  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   const role = localStorage.getItem('userRole')
  //   setState({
  //     isAuth: jwt !== null,
  //     userRole: role
  //   })
  // })

  console.log('[props]', props)
  console.log('[auth]', props.auth)

  let routes = (
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
    </Switch>
  )

  if (props.auth.isAuth) {
    routes = (
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
    )
  }

  if (props.auth.isAuth && props.auth.userRole === 'ROLE_ADMIN') {
    routes = (
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
        <Route path='/admin/product' exact>
          <AddProduct />
        </Route>
        <Route path='/admin/category' exact>
          <AddCategory />
        </Route>
      </Switch>
    )
  }

  return (
    <div className={styles.root__div}>
      <Router>
        <Toolbar userRole={props.auth.userRole} isAuth={props.auth.isAuth} isOpen={isOpen} setOpen={isOpenToggle} />
        <div className={styles.content__div}>
          {routes}
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Root);