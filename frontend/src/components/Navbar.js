import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbar = ({ click, showAlert, isAdmin }) => {

    const [name, setName] = useState('');

    let authToken = localStorage.getItem('authToken');
    
    let getName = () =>{
        if(authToken){
            let dec = jwtDecode(authToken);
            setName(dec.user.name)
        }
    }
    useEffect(() => { 
        getName();
    });

    let navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };


    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('authToken');
        localStorage.removeItem('useremail');
        showAlert("Successfully Logged out", "success");

        navigate("/login");
    }

    const handleAdminLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('admintoken');
        showAlert("Admin Logged out Successfullly", "success");

        navigate("/login");
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">

            <Link to="/" className="navbar__logo"
                style={{ "color": "white", "fontFamily": "Lucida Handwriting", fontSize: "30px" }}>
                NetMeds
            </Link>

            {
                (!localStorage.getItem('admintoken')) ?

                (!localStorage.getItem("authToken")) ?

                    <ul className="navbar__links">
                        <li>
                            <Link to="/" className="">
                                <span>
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link className="" to="/login">
                                <span>Login</span>
                            </Link>
                        </li>
                    </ul>
                    :
                    <ul className="navbar__links">
                        <li>
                            <Link to="/" className="">
                                <span>
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/myorder" className="">
                                <span>
                                    My Orders
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/about" className="">
                                <span>
                                    About Us
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact" className="">
                                <span>
                                    Contact Us
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="cart__link">
                                <i className="fa fa-shopping-cart"></i>
                                <span>
                                    Cart <span className="cartlogo__badge">{getCartCount()}</span>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <div className="dropdown">
                                <button className="dropbtn"><span>{name}</span>
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className="dropdown-content">
                                    <Link to="/myProfile"><span>My Profile</span></Link>
                                    <Link onClick={handleLogout}><span>Logout</span></Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                    :
                    <ul className="navbar__links">
                        <li>
                            <Link to="/admin" className="">
                                <span>
                                    Home
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/createproduct" className="">
                                <span>
                                    Create Product
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/contact" className="">
                                <span>
                                    Contact Details
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleAdminLogout} className="logout">
                                <span>
                                    Logout
                                </span>
                            </Link>
                        </li>
                        <li>
                            <span className="text-light" style={{"fontSize" : "20px", marginLeft : "700px"}}>Admin Site</span>
                        </li>

                    </ul>
            }

            <div className="hamburger__menu" onClick={click}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav >
    );
};

export default Navbar;
