import React from 'react'
import img1 from '../images/im1.jpg'
import img2 from '../images/im2.jpg'
import caro1 from "../images/caro1.jpg";
import caro2 from "../images/caro2.jpg";
import caro3 from "../images/caro3.jpg";
import caro4 from "../images/caro4.jpg";


export default function Slides() {
    return (
        <div className="container mt-4 vh-200" >
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img1} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item ">
                        <img src={caro2} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item ">
                        <img src={caro3} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={caro1} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={img2} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={caro4} className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
