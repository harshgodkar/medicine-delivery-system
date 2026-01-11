import React, { useState, useEffect } from "react"
import jwtDecode from "jwt-decode";

export default function UserProfile({showAlert}) {
  const [user, setUser] = useState({ name: "", email: "", mobile: "", location: "" });

  const token = localStorage.getItem("authToken");
  var userid;
  if (token) {
    const decodedToken = jwtDecode(token);
    const { id } = decodedToken.user;
    userid = id;
    console.log(userid);
  }
  useEffect(() => {
    fetch(`http://localhost:5000/profile/getuser/${userid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

  };

  async function updateuser(u) {
    try {
      // console.log(u)
      const response = await fetch(
        `http://localhost:5000/profile/updateuser/${u.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({user : u}),
        }
      );

      if (response.ok) {
        showAlert("User Profile Updated Successfully", "success");
        return;
      } else {
        console.error("Error updating Pack date:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Pack date:", error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateuser(user);
    // window.location.reload();
  };


  return (
    <div className="container mt-5">
      <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title align-center">Update User</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobiler" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={user.mobile}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="loc" className="form-label">
                    Location
                  </label>
                  <input
                    type="textarea"
                    className="form-control"
                    id="loc"
                    name="location"
                    value={user.location}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        

      </div>
    </div>

  );
}