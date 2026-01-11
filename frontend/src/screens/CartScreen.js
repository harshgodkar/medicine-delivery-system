import "../styles/CartScreen.css";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import StripeCheckout from "react-stripe-checkout";

export default function CartScreen(props) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => { }, []);

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
    };

    // Removing selected item from the cart
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    // To get the total items present in the cart
    const getCartCount = () => {
        
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };
    // Getting the total Price 
    const getCartSubTotal = () => {
        return cartItems
            .reduce((price, item) => price + item.price * item.qty, 0)
            .toFixed(2);
    };

    const makePayment = async() => {
        if(cartItems.length === 0){
            props.showAlert("Your Cart is Empty", "warning");
        }
        let userEmail = localStorage.getItem("useremail");
        // console.log(userEmail, new Date());
        // console.log(cartItems);
        // console.log(new Date().toLocaleString());
        // console.log(new Date().getDate());
        // console.log(userEmail);
        
        let response = await fetch("http://localhost:5000/med/order/orderData", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                order_data : cartItems,
                email : userEmail,
                order_date : new Date().toLocaleString()
            })
        });

        if(response.status === 200){
            cartItems.forEach(item => dispatch(removeFromCart(item.product)));
            props.showAlert(`Payment of ${getCartSubTotal()} is successfully Completed !!!`, "success");
        }

    }

    /*const makePayment = (token) => {
        const body = {
            token,
            product: cartItems,
            price: getCartSubTotal()

        }
        const headers = {
            "content-type": "application/json"
        }

        return fetch(`http://localhost:5000/med/payment`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log("RESPONSE", response)
            const { status } = response
            console.log("status", status)

            // Empty The cart after Succcesfull Payment
            cartItems.forEach(item => dispatch(removeFromCart(item.product)))
        }).catch(error => {
            console.log("ERROR", error)
        })
    }*/
    return (
        <>
            <div className="cartscreen" style={{ marginBottom: "460px" }}>
                <div className="cartscreen__left">
                    <h2>Shopping Cart</h2>

                    {cartItems.length === 0 ? (
                        <div>
                            Your Cart Is Empty <Link to="/">Go Back</Link>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <CartItem
                                key={item.product}
                                item={item}
                                qtyChangeHandler={qtyChangeHandler}
                                removeHandler={removeFromCartHandler}
                            />
                        ))
                    )}
                </div>

                <div className="cartscreen__right">
                    <div className="cartscreen__info">
                        <p>Subtotal ({getCartCount()}) items</p>
                        <p>TOTAL(INR) : ₹{getCartSubTotal()}/- </p>
                    </div>
                    <div>
                        <button onClick={makePayment}>Buy Products</button>
                        <button type="button" >
                            <StripeCheckout stripeKey="pk_test_51Ngv7tSC0oXopJ4iphzKlDhCjd46HGm0FPhUiSWw4xsqV2o2FmmYMtQ1zaBPfZOLA7Z0qgmPsg7DvRIaCtm24cbw00L25m0FJk"
                                token={makePayment} amount={getCartSubTotal()}
                                shippingAddress
                                billingAddress
                                name="Buy Products" />
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}
