import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  SignIn,
  SignUp,
  Home,
  ProductDetail,
  Cart,
  Profile,
  OrderHistory,
  Shipping,
  Message,
} from './screens';
import {
  Toolbar,
  Auth,
  Spinner,
  AddProduct,
  AddCategory,
  EditProduct,
} from './components';
import { authSuccess } from './store/actions/auth';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import styles from './Root.module.css';

const Root = (props) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    props.onSuccess(auth);
    //eslint-disable-next-line
  }, []);

  const isOpenToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return props.isCheckingAuth ? (
    <Spinner />
  ) : (
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
              <Auth component={Cart} auth={props.auth} role='ROLE_USER' />
            </Route>
            <Route path='/message' exact>
              <Auth
                component={Message}
                auth={props.auth}
                role={props.auth && props.auth.userRole}
              />
            </Route>
            <Route path='/checkout' exact>
              <Auth component={Shipping} auth={props.auth} role='ROLE_USER' />
            </Route>
            <Route path='/user' exact>
              <Auth component={Profile} auth={props.auth} role='ROLE_USER' />
            </Route>
            <Route path='/orders' exact>
              <Auth
                component={OrderHistory}
                auth={props.auth}
                role='ROLE_USER'
              />
            </Route>
            <Route path='/admin/product' exact>
              <Auth
                component={AddProduct}
                auth={props.auth}
                role='ROLE_ADMIN'
              />
            </Route>
            <Route path='/admin/product/edit/:id' exact>
              <Auth
                component={EditProduct}
                auth={props.auth}
                role='ROLE_ADMIN'
              />
            </Route>
            <Route path='/admin/category' exact>
              <Auth
                component={AddCategory}
                auth={props.auth}
                role='ROLE_ADMIN'
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    isCheckingAuth: state.auth.isCheckingAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSuccess: (authData) => {
      dispatch(authSuccess(authData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
