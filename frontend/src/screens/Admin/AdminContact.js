import React, { useEffect, useState } from 'react'

export default function AdminContact() {
    const [contact, setContact] = useState([]);

    const loadData = async () => {
        let response = await fetch('http://localhost:5000/med/getcontact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json()
        // console.log(response.products);

        setContact(response.contact);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div className="content-wrapper mt-3">
                <div className="container-fluid">

                    <h2 style={{ "textAlign": "center" }}>Messages From Users</h2>
                    <hr className="w-50 mx-auto mb-5" />
                    <div className="card mb-3">

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped" id="dataTable" width="100%" cellspacing="0">
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th>Index no.</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>City</th>
                                            <th>Message</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {
                                            contact.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.fullName}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.city}</td>
                                                    <td>{data.message}</td>

                                                    {/* <td>{new Date(data.date).getFullYear()}</td> */}
                                                    {/* <td>{new Date(data.date).getFullYear()}-{(new Date(data.date).getMonth() + 1).toString().padStart(2, '0')}-{new Date(data.date).getDate().toString().padStart(2, '0')}</td> */}
                                                    <td>{new Date(data.date).getDate().toString().padStart(2, '0')}/{(new Date(data.date).getMonth() + 1).toString().padStart(2, '0')}/{new Date(data.date).getFullYear()}</td>


                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
