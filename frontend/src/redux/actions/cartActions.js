import * as actionTypes from "../constants/cartConstants";
// import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  let res = await fetch(`http://localhost:5000/med/product/${id}`,{
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
  }
  });
  res = await res.json()
  const data = res.product;
  // console.log(res);
  // console.log(res.product);
  // console.log("Hello");

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      title: data.title,
      imgsrc: data.imgsrc,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
