import React, { useState } from 'react'

export default function AdminCreate({ showAlert }) {
    const [productData, setProductData] = useState({ title: "", imgsrc:"", category: "", indication: "", dosage: "", sideEffect: "", price: 0, countInStock: 0 });
    const ChangeState = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch("http://localhost:5000/admin/createproduct", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ title: productData.title, imgsrc : productData.imgsrc, category: productData.category, indication: productData.indication, dosage: productData.dosage, sideEffect: productData.sideEffect, price: productData.price, countInStock: productData.countInStock })
        });
        const json = await response.json();
        console.log(json.success);
        if (!json.success) {
            showAlert("Some Problem Occurred...", "warning");
        } else {
            showAlert("Product Added Successfully...", "success");
        }
    }
    return (
        <div className='container mt-5 mb-3'>
            <h3 className='text-center '>Create Product</h3>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-5">
                    <label for="title" className="form-label ">Product Title</label>
                    <input type="text" className="form-control" value={productData.title} name='title' id="title" onChange={ChangeState} />
                </div>

                <div className='mb-3'>
                    <label for="imgsrc" className="form-label ">Product Image</label>
                    <input type="text" className="form-control" value={productData.imgsrc} name='imgsrc' id="imgsrc" onChange={ChangeState} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="category">Select Product Category</label>
                    <select className="form-select" id='category' value={productData.category} name='category' aria-label="Default select example" onChange={ChangeState}>

                        <option selected value="Dermatology">Dermatology</option>
                        <option value="Women's Care">Women's Care</option>
                        <option value="Fracture">Fracture</option>
                        <option value="Dental">Dental</option>
                        <option value='Depression'>Depression</option>
                        <option value="Diabetes">Diabetes</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label for="indication" className="form-label">Product Indication</label>
                    <textarea type="text" value={productData.indication} className="form-control" name='indication' id="indication" onChange={ChangeState} />
                </div>
                <div className="mb-3">
                    <label for="dosage" className="form-label">Product Dosage</label>
                    <input type="text" className="form-control" value={productData.dosage} name='dosage' id="dosage" onChange={ChangeState} />
                </div>
                <div className="mb-3">
                    <label for="sideEffect" className="form-label">Product SideEffects</label>
                    <input type="text" className="form-control" value={productData.sideEffect} name='sideEffect' id="sideEffect" onChange={ChangeState} />
                </div>
                <div className="mb-3">
                    <label for="price" className="form-label">Product price</label>
                    <input type="number" className="form-control" value={productData.price} name='price' id="price" onChange={ChangeState} />
                </div>
                <div className="mb-3">
                    <label for="countInStock" className="form-label">Stock count</label>
                    <input type="number" className="form-control" value={productData.countInStock} name='countInStock' id="countInStock" onChange={ChangeState} />
                </div>

                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    )
}
