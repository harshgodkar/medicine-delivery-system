import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar'

export default function Login({showAlert}) {
  const [userdata, setUserData] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handelSubmit = async (event) => {

    event.preventDefault();

    const response = await fetch("http://localhost:5000/med/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email: userdata.email, password: userdata.password })
    });
    const json = await response.json();
    // console.log(json);
    if (!json.success) {
      showAlert("Email or Password is incorrect", "danger");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("useremail", userdata.email);
      showAlert("Successfully Logged in", "success");
      navigate("/");
    }

  }

  const ChangeState = (event) => {
    setUserData({ ...userdata, [event.target.name]: event.target.value })
  }

 
  return (
    <div>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-dark border" style={{ "borderRadius": 25 }}>
                <div className="card-body-white p-md-5">
                  <div className="row justify-content-center">
                    <div className="md-10 lg-6 xl-5 order-2 order-lg-1">
  
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>
                      <form onSubmit={handelSubmit}>
                        <div className="form-outline mb-4">
                          <input type="email" id="form2Example1" name='email' className="form-control" value={userdata.email} onChange={ChangeState} />
                          <label className="form-label" htmlFor="form2Example1">Email address</label>
                        </div>
                    
                        <div className="form-group my-2 form-outline mb-4">
                          <input type="password" id="form2Example2" name='password' className="form-control my-1" value={userdata.password} onChange={ChangeState} />
                          <label className="form-label" htmlFor="form2Example2">Password</label>
                        </div>
  
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="m-3 btn btn-primary btn-lg">Login</button>
                          <Link to='/createuser' className="m-3 btn btn-success btn-lg">I'm a New User</Link>
                        </div>

                        <p>Are You Admin?  <Link to='/admin/login'>Admin Login</Link></p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


