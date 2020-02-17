import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
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
  MDBDropdownItem
} from "mdbreact";

import { logout } from '../../store/actions/auth';

const Toolbar = props => {
  const history = useHistory();

  const handleAddProduct = () => {
    history.push('/admin/product')
  }

  const handleAddCategory = () => {
    history.push('/admin/category')
  }

  const handleLogout = () => {
    localStorage.clear();
    props.onLogout();
  }

  const renderUnauthBar = () => {
    return (
      <MDBCollapse id="navbarCollapse3" isOpen={props.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="/">
              Home
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to="/sign-in">
              Signin
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/sign-up">
              Signup
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    )
  }

  const renderAuthBar = () => {
    return (
      <MDBCollapse id="navbarCollapse3" isOpen={props.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="/">
              Home
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to="/cart">
              Cart <i className="fas fa-shopping-cart"></i>
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/user">
              Profile <i className="fas fa-user"></i>
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink onClick={handleLogout} to="/">
              Signout
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    )
  }

  const renderAdminBar = () => {
    return (
      <MDBCollapse id="navbarCollapse3" isOpen={props.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="/">
              Home
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Admin</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem onClick={handleAddProduct}>Add Product</MDBDropdownItem>
                <MDBDropdownItem onClick={handleAddCategory}>Add Category</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink onClick={handleLogout} to="/">
              Signout
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    )
  }

  return (
    <MDBNavbar color="default-color" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">STYLOUSE</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={props.setOpen} />
      {!props.auth ? renderUnauthBar() : props.auth.userRole === 'ROLE_ADMIN' ? renderAdminBar() : renderAuthBar()}
    </MDBNavbar>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);