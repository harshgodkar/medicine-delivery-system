import React, { useEffect, useState } from 'react'
import OrderItem from '../components/OrderItem';

export default function MyOrder() {

  const [orderData, setOrderData] = useState([]);
  const [name, setName] = useState('');
  const [hasOrdered, setHasOrdered] = useState(false)

  let email = localStorage.getItem('useremail');
  const fetchOrder = async () => {

    await fetch("http://localhost:5000/med/order/myOrder", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    }).then(async (res) => {
      let myorders = await res.json();

      if (myorders.success === false) {
        setHasOrdered(false);
      }
      else {
        setHasOrdered(true);
      }
      // console.log(myorders.orderData);

      // console.log(myorders.name);
      setOrderData(myorders.orderData);
      setName(myorders.name);
      // Array(myorders.orderData).map((pro) => {
      //   console.log(pro);
      // })

      // orderData.map((data) => {
      //   console.log(data);
      // })
    })

  }

  useEffect(() => {
    fetchOrder()
  }, []);


  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-8">
            <div className="card" style={{ "borderRadius": "10px" }}>
              {hasOrdered && (
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">Thanks for your Order, <span style={{ color: "#0f0e0e" }}>{name}</span>!</h5>
                </div>
              )
              }
              <div className="card-body p-4">
                {/* <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0" style={{ color: "#0f0e0e" }}>Receipt</p>
                  <p className="small text-muted mb-0">Receipt Voucher : 1KAU9-84UIL</p>
                </div> */}

                {
                  hasOrdered ? orderData.map((data, index) => {
                    return (
                      data.map((item) => {
                        return (
                          <div>
                            {
                              item.Order_date ?
                                <div className='m-auto mt-5'> {data = item.Order_date} <hr /></div>
                                :
                                <OrderItem id={item.product} imgsrc={item.imgsrc} title={item.title} qty={item.qty} price={item.price} index={index} />

                            } 
                          </div>
                        )
                      })
                    )
                  })
                    :
                    <div>
                      <h2> You Haven't Order Yet...!!!</h2>
                    </div>

                }

                {/* <div className="d-flex justify-content-between pt-2">
                  <p className="fw-bold mb-0">Order Details</p>
                  <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> ₹898.00</p>
                </div>

                <div className="d-flex justify-content-between pt-2">
                  <p className="text-muted mb-0">Invoice Number : 788152</p>
                  <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> ₹19.00</p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
                  <p className="text-muted mb-0"><span className="fw-bold me-4">GST 18%</span> 123</p>
                </div>

                <div className="d-flex justify-content-between mb-5">
                  <p className="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
                  <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Free</p>
                </div> */}
              </div>
              {/* <div className="card-footer border-0 px-4 py-5"
                style={{ "backgroundColor": "#0f0e0e", "borderBottomLeftRadius": "10px", "borderBottomRightRadius": "10px" }}>
                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
                  paid: <span className="h2 mb-0 ms-2">₹1040</span></h5>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
