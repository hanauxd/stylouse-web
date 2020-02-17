import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SignIn, SignUp, Home, ProductDetail, Cart, Profile, OrderHistory } from './screens';
import { Toolbar, Auth } from './components';
import { authSuccess } from './store/actions/auth';
import Shipping from './screens/cart/shipping/Shipping';
import AddProduct from './components/admin/product/AddProduct';
import AddCategory from './components/admin/category/AddCategory';

import styles from './Root.module.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const Root = props => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth !== null) {
      props.onSuccess({ ...auth });
    }
    //eslint-disable-next-line
  }, [])

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
              <Auth component={Cart} auth={props.auth.auth} role="ROLE_USER" />
            </Route>
            <Route path='/checkout' exact>
              <Auth component={Shipping} auth={props.auth.auth} role="ROLE_USER" />
            </Route>
            <Route path='/user' exact>
              <Auth component={Profile} auth={props.auth.auth} role="ROLE_USER" />
            </Route>
            <Route path='/orders' exact>
              <Auth component={OrderHistory} auth={props.auth.auth} role="ROLE_USER" />
            </Route>
            <Route path='/admin/product' exact>
              <Auth component={AddProduct} auth={props.auth.auth} role="ROLE_ADMIN" />
            </Route>
            <Route path='/admin/category' exact>
              <Auth component={AddCategory} auth={props.auth.auth} role="ROLE_ADMIN" />
            </Route>
          </Switch>
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

const mapDispatchToProps = dispatch => {
  return {
    onSuccess: authData => {
      dispatch(authSuccess(authData));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);