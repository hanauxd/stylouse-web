import React, { useEffect } from "react";
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
import { useCustomState } from "../../helpers/hooks";

const Toolbar = props => {
  const history = useHistory();

  // const [state, setState] = useCustomState({
  //   isAuth: false,
  //   userRole: '',
  //   isOpen: false
  // })

  // useEffect(() => {
  //   setState({
  //     isAuth: props.isAuth,
  //     userRole: props.userRole,
  //     isOpen: props.isOpen
  //   })
  // })

  const handleAddProduct = () => {
    history.push('/admin/product')
  }

  const handleAddCategory = () => {
    history.push('/admin/category')
  }

  let toolbar = (
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

  if (props.auth.isAuth) {
    toolbar = (
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

  if (props.auth.isAuth && props.auth.userRole === 'ROLE_ADMIN') {
    toolbar = (
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

  console.log('Toolbar', props.auth)

  return (
    <MDBNavbar color="default-color" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">STYLOUSE</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={props.setOpen} />
      {toolbar}
    </MDBNavbar>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Toolbar);