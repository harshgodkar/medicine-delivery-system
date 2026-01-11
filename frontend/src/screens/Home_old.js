import React, { useEffect, useState } from 'react'
// import Carousel from './Carousel'
// import Card from '../components/Card'
import Product from '../components/Product'
import caro2 from "../images/caro2.jpg";
// import caro1 from "../images/caro1.jpg";
// import caro3 from "../images/caro3.jpg";
// import caro4 from "../images/caro4.webp";

export default function Home() {

  const [medicine_category, setMedCat] = useState([])
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

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
  }, [])


  return (
    <>
      <div>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "11" }}>
              <form className="d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn text-white bg-dark" onClick={() => { setSearch('') }}>x</button> */}
                {/* <input className="form-control me-2 form-control-outline-dark text-dark bg-light" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-light text-white bg-primary" type="submit">Search</button> */}
              </form>
            </div>
            <div className="carousel-item active">
              <img src={caro2} className="d-block w-100" style={{ filter: "brightness(70%)", "boxSizing": "inherit" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x400/?medicine" style={{ filter: "brightness(70%)", "boxSizing": "inherit" }} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={caro2} style={{ filter: "brightness(70%)", "boxSizing": "inherit" }} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x400/?medicine" style={{ filter: "brightness(70%)", "boxSizing": "inherit" }} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {
          medicine_category !== [] ? medicine_category.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>{data.category}</div>
                <hr />
                {
                  products !== [] ? products.filter((item) => item.category === data.category && (item.title.toLowerCase().includes(search.toLowerCase())))
                    .map((filterItem) => {
                      return (
                        <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                          <Product item={filterItem}></Product>
                        </div>
                      )
                    })
                    : <div>No Such Data Found</div>
                }
              </div>

            )
          })
            : " "
        }

      </div>
</>

  )
}
