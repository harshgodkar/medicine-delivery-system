import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function AdminUpdate(props) {
    const [productData, setProductData] = useState({ title: "", category: "", indication: "", dosage: "", sideEffects: "", price: 0, countInStock: 0 });

    let { id } = useParams();

    const ChangeState = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }


    const loadData = async () => {
        let response = await fetch(`http://localhost:5000/med/product/${id}`, {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json()
        // console.log(response.product);

        setProductData(response.product);

    }
    useEffect(() => {
        loadData()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // console.log(productData)
            let response = await fetch(
                `http://localhost:5000/admin/updateproduct/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ product: productData }),
                }
            );
            response = await response.json()
            console.log(response.success)
            if (response.success) {
                props.showAlert("Product Updated Successfullly", "success")
            } else {
                console.error("Error updating Pack date:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating Pack date:", error);
        }
    }

    return (
        <div className='container mt-5 mb-3'>
            <h3 className='text-center '>Update Product</h3>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-5">
                    <label htmlFor="title" className="form-label ">Product Title</label>
                    <input type="text" className="form-control" value={productData.title} name='title' id="title" onChange={ChangeState} />
                </div>
                <div className='mb-3'>
                    <label htmlhtmlFor="category">Change Product Category</label>
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
                    <label htmlFor="indication" className="form-label">Product Indication</label>
                    <textarea type="text" value={productData.indication} className="form-control" name='indication' id="indication" onChange={ChangeState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="dosage" className="form-label">Product Dosage</label>
                    <input type="text" className="form-control" value={productData.dosage} name='dosage' id="dosage" onChange={ChangeState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="sideEffect" className="form-label">Product SideEffects</label>
                    <textarea type="text" className="form-control" value={productData.sideEffects} name='sideEffects' id="sideEffect" onChange={ChangeState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Product price</label>
                    <input type="number" className="form-control" value={productData.price} name='price' id="price" onChange={ChangeState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="countInStock" className="form-label">Stock count</label>
                    <input type="number" className="form-control" value={productData.countInStock} name='countInStock' id="countInStock" onChange={ChangeState} />
                </div>

                <button type="submit" className="btn btn-primary">Update Product</button>
            </form>
        </div>
    )
}
