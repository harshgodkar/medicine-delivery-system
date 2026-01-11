import React from 'react'
import '../styles/CartItem.css';
import { Link } from 'react-router-dom'

export default function OrderItem({ id, imgsrc, title, qty, price }) {
    return (
        <div className="card shadow-0 border mb-4">
            <div className="card-body">
                <div className="row">
                    <Link to={`/product/${id}`} className="col-md-2 hover-overlay" data-mdb-ripple-color="light">
                        <img src={imgsrc} className="img-fluid" alt="Phone" />
                    </Link>

                    <Link to={`/product/${id}`} className="col-md-4 text-center d-flex justify-content-center align-items-center cartItem__name">
                        <p>{title}</p>
                    </Link>

                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">Qty: {qty}</p>
                    </div>
                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">₹{price}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}
