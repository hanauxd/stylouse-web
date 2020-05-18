import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';

import { logout } from '../../store/actions/auth';

const Toolbar = (props) => {
  const history = useHistory();

  const handleAddProduct = () => {
    history.push('/admin/product');
  };

  const handleAddCategory = () => {
    history.push('/admin/category');
  };

  const handleLogout = () => {
    localStorage.clear();
    props.onLogout();
  };

  const renderUnauthBar = () => {
    return (
      <MDBCollapse id='navbarCollapse3' isOpen={props.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to='/'>
              <HomeRoundedIcon />
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to='/sign-in'>Signin</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to='/sign-up'>Signup</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    );
  };

  const renderAuthBar = () => {
    return (
      <MDBCollapse id='navbarCollapse3' isOpen={props.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to='/'>
              <HomeRoundedIcon />
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to='/cart'>
              <ShoppingBasketRoundedIcon />
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to='/message'>
              <ChatRoundedIcon />
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to='/user'>
              <AccountCircleRoundedIcon />
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink onClick={handleLogout} to='/sign-in'>
              <ExitToAppRoundedIcon />
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    );
  };

  const renderAdminBar = () => {
    return (
      <MDBCollapse id='navbarCollapse3' isOpen={props.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to='/'>
              <HomeRoundedIcon />
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className='d-none d-md-inline'>
                  <SupervisedUserCircleRoundedIcon />
                </div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className='dropdown-default'>
                <MDBDropdownItem onClick={handleAddProduct}>
                  Add Product
                </MDBDropdownItem>
                <MDBDropdownItem onClick={handleAddCategory}>
                  Add Category
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to='/message'>
              <ChatRoundedIcon />
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink onClick={handleLogout} to='/sign-in'>
              <ExitToAppRoundedIcon />
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    );
  };

  return (
    <MDBNavbar color='purple-gradient' dark expand='md'>
      <MDBNavbarBrand>
        <strong className='white-text'>STYLOUSE</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={props.setOpen} />
      {!props.auth
        ? renderUnauthBar()
        : props.auth.userRole === 'ROLE_ADMIN'
        ? renderAdminBar()
        : renderAuthBar()}
    </MDBNavbar>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
