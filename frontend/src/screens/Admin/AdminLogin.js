import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminLogin({showAlert}) {

    const [userdata, setUserData] = useState({ username: "", password: "" });
    const ChangeState = (event) => {
        setUserData({ ...userdata, [event.target.name]: event.target.value })
    }

    let navigate = useNavigate();

    const handelSubmit = (event)=>{
        event.preventDefault();
        if(userdata.username == "admin123"){
            if(userdata.password == "admin#password"){
                localStorage.setItem("admintoken", userdata.username);
                
                showAlert("Now You are in Admin site...", "success");
                navigate('/admin');
            }
            else{
                showAlert("admin password is wrong!!!", "danger");
            }
        }
        else{
            showAlert("admin username is wrong!!!", "danger");
        }
    }


    return (
        <div>
            <div>
                <section className="vh-100">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-dark border" style={{ "borderRadius": 25 }}>
                                    <div className="card-body-white p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="md-10 lg-6 xl-5 order-2 order-lg-1">

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Admin Sign In</p>
                                                <form onSubmit={handelSubmit} method='POST'>
                                                    <div className="form-outline mb-4">
                                                        <input type="text" id="form2Example1" name='username' className="form-control" value={userdata.username} onChange={ChangeState} />
                                                        <label className="form-label" htmlFor="form2Example1">Admin username</label>
                                                    </div>

                                                    <div className="form-group my-2 form-outline mb-4">
                                                        <input type="password" id="form2Example2" name='password' className="form-control my-1" value={userdata.password} onChange={ChangeState} />
                                                        <label className="form-label" htmlFor="form2Example2">Admin Password</label>
                                                    </div>

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button type="submit" className="m-3 btn btn-primary btn-lg">Login</button>
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
        </div>
    )
}
