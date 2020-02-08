import React from 'react';

import styles from './ProductListItem.module.css';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

const ProductListItem = props => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  })

  return (
    <div className={styles.product}>
      <MDBCard className=" z-depth-1-half">
        <div className="view zoom">
          <MDBCardImage
            style={{ width: "18rem", height: `${18 / (525 / 668)}rem` }}
            className="img-fluid"
            src={props.src}
            waves />
        </div>
        <MDBCardBody className="text-center">
          <h5 className="grey-text">
            {props.category}
          </h5>
          <MDBCardTitle>
            <strong>
              <Link style={{ color: 'teal' }} to={`/products/${props.id}`}>{props.title}</Link>
            </strong>
          </MDBCardTitle>
          <hr />
          <div className="px-1">
            <span className="float-left font-weight-bold">
              <strong>{formatter.format(props.price)}</strong>
            </span>
            <span className="float-right">
              <MDBIcon className={styles.icon} icon="fa fa-heart grey-text ml-3" onClick={() => { console.log("HEART") }} />
              <MDBIcon className={styles.icon} icon="fa fa-shopping-cart grey-text ml-3" onClick={() => { console.log("CART") }} />
            </span>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

export default ProductListItem;