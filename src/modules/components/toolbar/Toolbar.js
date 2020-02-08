import React from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";

const Toolbar = props => {
  return (
    <MDBNavbar color="default-color" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">STYLOUSE</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={props.setOpen} />
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
            <MDBNavLink to="#!">
              Profile <i className="fas fa-user"></i>
            </MDBNavLink>
          </MDBNavItem>
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
    </MDBNavbar>
  )
}

export default Toolbar;