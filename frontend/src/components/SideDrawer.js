import "../styles/SideDrawer.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from "react";

const SideDrawer = ({ show, click, showAlert }) => {
  const [name, setName] = useState('');
  const sideDrawerClass = ["sidedrawer"];
  let navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };
  let authToken = localStorage.getItem('authToken');
  
    // useEffect(() => { 
    //     let authToken = localStorage.getItem('authToken');
    //     let dec = jwtDecode(authToken);
    //     //console.log(dec);
    //     setName(dec.user.name)
    // }, []);
    let getName = () =>{
      if(authToken){
          let dec = jwtDecode(authToken);
          setName(dec.user.name)
      }
  }
  useEffect(() => { 
      getName();
  });

  if (show) {
    sideDrawerClass.push("show");
  }

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('authToken');

    showAlert("Successfully Logged out", "success");

    navigate("/login");
  }



  return (
    <div className={sideDrawerClass.join(" ")}>
      {
        (!localStorage.getItem("authToken")) ?
          <ul className="sidedrawer__links" onClick={click}>
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
          <ul className="sidedrawer__links" onClick={click}>
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
              <div style={{"justifyContent" : "center", marginLeft : "180px"}}>
              <div className="dropdown">
                <button className="dropbtn"  ><span style={{"color" : "black", "fontSize" : "22px"}}>{name}</span>
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to="/myProfile"><span>My Profile</span></Link>
                  <Link onClick={handleLogout}><span>Logout</span></Link>
                </div>
              </div>
              </div>
            </li>
            <li>
              <Link to="/cart">
                <i className="fa fa-shopping-cart"></i>
                <span>
                  Cart <span className="sidedrawer__cartbadge">{getCartCount()}</span>
                </span>
              </Link>
            </li>
          </ul>

      }
    </div>
    /*  
        <div className={sideDrawerClass.join(" ")}>
          <ul className="sidedrawer__links" onClick={click}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allProducts">Products</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="fa fa-shopping-cart"></i>
                <span>
                  Cart{" "}
                  <span className="sidedrawer__cartbadge">{getCartCount()}</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>*/
  );
};

export default SideDrawer;
