import React, { useEffect, useState } from 'react'
import Card from '../../components/Card';
import Product from '../../components/Product';
import AdminProduct from '../../components/AdminProduct';

export default function AdminHome() {

  const [medicine_category, setMedCat] = useState([])
  const [products, setProducts] = useState([])
  // const [search, setSearch] = useState('')
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/med/meddata", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    // console.log(response[1][0].CategoryName)
    setProducts(response[0])
    setMedCat(response[1])
  }

  useEffect(() => {
    loadData()
  })


  return (
    <div>
      <div className="container">
        {
          medicine_category.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>{data.category}</div>
                <hr />
                {
                  products.filter((item) => item.category == data.category)
                    .map((filterItem) => {
                      return (
                        <div key={filterItem._id} className='col-lg-6 col-md-9'>
                          <AdminProduct
                            key={filterItem._id}
                            imgsrc={filterItem.imgsrc}
                            title={filterItem.title}
                            indication={filterItem.indication.length > 100 ? filterItem.indication.slice(0, 100) + "..." : filterItem.indication}
                            dosage={filterItem.dosage.length > 50 ? filterItem.dosage.slice(0, 50) + "..." : filterItem.dosage}
                            sideEffects={filterItem.sideEffects.length > 50 ? filterItem.sideEffects.slice(0, 50) + "..." : filterItem.sideEffects}
                            price={filterItem.price}
                            productId={filterItem._id}
                          />
                        </div>
                      )
                    })

                }
              </div>

            )
          })
        }

      </div>
    </div>
  )
}
