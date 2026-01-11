import React, { useEffect, useState } from 'react';
import Card from "../components/Card";
import Slides from '../components/Slides';
import '../styles/HomeScreen.css'
import Navbar from '../components/Navbar';


function Home() {
    const [medicine_category, setMedCat] = useState([])
    // const [products, setProducts] = useState([])
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
        // setProducts(response[0])
        setMedCat(response[1])
    }

    useEffect(() => {
        loadData()
        // Navbar() 
    }, [])
    return (
        <div>
            <div className="container text-center ">
                <h1 className="mt-3 "> Online Medicine Store</h1>
                <hr className="w-50 mx-auto" />
            </div>

            <div className="container mt-4" >
                <Slides />
            </div>

            <div className="homescreen" style={{ marginTop: "50px" }}>
                <div className="container text-center ">
                    <h1 className="mt-3 ">Explore By</h1>
                    <hr className="w-50 mx-auto" />
                </div>

                <div className="homescreen__products">
                    {medicine_category.map((val, index) => {
                        return (
                            <Card
                                key={index}
                                title={val.category}
                                info={"Medicines On " + val.category}
                                link={"products/" + val.category}
                                id={val.id}
                            />
                        )

                    })}

                </div>
            </div>

        </div>
    )
}

export default Home;
