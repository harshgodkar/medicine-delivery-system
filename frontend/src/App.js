import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import ProductDetails from './screens/ProductDetails';
import ProductScreen from './screens/ProductScreen';

import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import SignUp from './screens/SignUp';
import Footer from './components/Footer';
import { useState } from 'react';
import Navbar from './components/Navbar';
import SideDrawer from './components/SideDrawer';
import Backdrop from './components/Backdrop';
import CartScreen from './screens/CartScreen';
import Alert from './components/Alert'
import MyOrder from './screens/MyOrder';
import UserProfile from './screens/UserProfile';
import ContactScreen from './screens/ContactScreen';
import AboutScreen from './screens/AboutScreen';
import AdminHome from './screens/Admin/AdminHome';
import AdminLogin from './screens/Admin/AdminLogin';
import AdminCreate from './screens/Admin/AdminCreate';
import AdminUpdate from './screens/Admin/AdminUpdate';
import AdminContact from './screens/Admin/AdminContact';


function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const [alert, setAlert] = useState();

  const showAlert = (message, key) => {
    setAlert({ msg: message, type: key })

    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }

  return (
    <Router>
      <Navbar showAlert={showAlert} click={() => setSideToggle(true)} />
      <Alert alert={alert} />
      <SideDrawer show={sideToggle} showAlert={showAlert} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <Routes>
        <Route exact="true" path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
        <Route path="/createuser" element={<SignUp showAlert={showAlert}/>}></Route>
        <Route path='/products/:name' element={<ProductScreen />}></Route>
        <Route path='/product/:id' element={<ProductDetails showAlert={showAlert}/>}></Route>
        <Route path="/cart" element={<CartScreen showAlert={showAlert} />}></Route>
        <Route path="/myorder" element={<MyOrder />} />
        <Route path='/myProfile' element={<UserProfile showAlert={showAlert} />} />
        <Route path='/contact'  element={<ContactScreen showAlert={showAlert} />} />
        <Route path='/about' element={<AboutScreen />} />
      </Routes>
      <Routes>
        <Route exact path='/admin' element={<AdminHome />} />
        <Route path='/admin/login' element={<AdminLogin showAlert={showAlert} />} />
        <Route path='/admin/createproduct' element={<AdminCreate showAlert={showAlert} />} />
        <Route path='/admin/contact' element={<AdminContact />} />
        <Route path='/admin/update/:id' element={<AdminUpdate showAlert={showAlert} />} />
      </Routes>
      <Footer />
    </Router >
  );
}

export default App;
