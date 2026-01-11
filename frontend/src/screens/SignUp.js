import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';


export default function SignUp({ showAlert }) {
    const [userdata, setUserData] = useState({ name: "", email: "", password: "", rpassword: "", mobile: "", location: "" });
    let navigate = useNavigate();

    const handelSubmit = async (event) => {
        event.preventDefault();
        if (userdata.password === userdata.rpassword) {
            const response = await fetch("http://localhost:5000/med/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ name: userdata.name, email: userdata.email, mobile: userdata.mobile, password: userdata.password, location: userdata.location })
            });
            const json = await response.json();
            console.log(json);
            if (!json.success) {
                showAlert("Enter Valid Data...", "warning");
            } else {
                showAlert("Registration Successful...", "success")
                navigate("/login");
            }
        }
        else {
            showAlert("Both Password should match.", "warning");
        }
    }

    const ChangeState = (event) => {
        setUserData({ ...userdata, [event.target.name]: event.target.value })
    }

    return (
        <div className='mt-5'>
            <section className="vh-65" >
                <div className="container h-100 z-1">
                    <div className="row d-flex justify-content-center align-items-center h-100" >
                        <div className="col-lg-12 col-xl-11">

                            <div className="card text-dark border" style={{ backgroundColor: "#FFFFFF", "borderRadius": 20, "borderColor": "lightblue" }}>
                                <div className="card-body-dark p-md-5" >
                                    <div className="row justify-content-center">
                                        <div className="md-10 lg-6 xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-2" onSubmit={handelSubmit}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline-dark flex-fill mb-0">
                                                        <input type="text" name="name" id="form3Example1c" className="form-control" value={userdata.name} onChange={ChangeState} />
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className="d-flex flex-row align-items-center col-6 mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="email" name="email" id="form3Example3c" className="form-control" value={userdata.email} onChange={ChangeState} />
                                                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center col-6 mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="text" name="mobile" id="form3Example3c" className="form-control" value={userdata.mobile} onChange={ChangeState} />
                                                            <label className="form-label" htmlFor="form3Example3c">Your Mobile Number</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="d-flex flex-row align-items-center col-6 mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="password" name="password" id="form3Example4c" className="form-control" value={userdata.password} onChange={ChangeState} />
                                                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center col-6 mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="password" name="rpassword" id="form3Example4cd" className="form-control" value={userdata.rpassword} onChange={ChangeState} />
                                                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="textarea" name="location" id="form3Example4c" className="form-control" value={userdata.location} onChange={ChangeState} />
                                                        <label className="form-label" htmlFor="form3Example4c">Location</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="m-3 btn btn-primary btn-lg">Register</button>
                                                    <Link to='/login' className="m-3 btn btn-success btn-lg">Already a user</Link>
                                                </div>
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
