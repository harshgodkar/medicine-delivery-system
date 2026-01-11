import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Product from '../components/Product'

export default function ProductScreen() {

  const [products, setProducts] = useState([])
  const { name } = useParams();
  let navigate = useNavigate();
  // console.log(name);
  const loadData = async () => {
    let response = await fetch(`http://localhost:5000/med/cat/${name}`, {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    // console.log(response.products);

    setProducts(response.products);

  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div className="homescreen">
        <div className="container text-center">
          <h1 className="mt-3">{name}</h1>
          <hr className="w-25 mx-auto" />
        </div>
        <div className="homescreen__products">
          {
            products.map((product) => {
              return (
                <Product
                  key={product._id}
                  imgsrc={product.imgsrc}
                  title={product.title}
                  indication={product.indication.length > 100 ? product.indication.slice(0, 100) + "..." : product.indication}
                  dosage={product.dosage.length > 50 ? product.dosage.slice(0, 50) + "..." : product.dosage}
                  sideEffects={product.sideEffects.length > 50 ? product.sideEffects.slice(0, 50) + "..." : product.sideEffects}
                  price={product.price}
                  productId={product._id}
                />
              )
            }

            )
          }
        </div>
      </div>
    </div>

  )
}
