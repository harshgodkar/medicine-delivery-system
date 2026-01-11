import "../styles/ProductScreen.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { addToCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import SnackBar from "../components/SnackBar";

const ProductDetails = ({showAlert}) => {
    const [qty, setQty] = useState(1);
    const [product, setProduct] = useState({})
    const { id } = useParams();
    const dispatch = useDispatch();
    let navigator = useNavigate();
    // console.log(id);
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

        setProduct(response.product);

    }

    useEffect(() => {
        loadData()
    }, [])


    const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty));
        showAlert("Added to Cart.", "success");
    };

    return (
        <>
            {!localStorage.getItem('authToken') ? <SnackBar/>
                :
                <div className="productscreen">
                    <div className="productscreen__left">
                        <div className="left__image">
                            <img src={product.imgsrc} alt={product.title} />
                        </div>
                        <div className="left__info">
                            <p className="left__name">{product.title}</p>
                            <p> <span style={{ fontWeight: "bold", fontSize: "14px" }}>Price:</span> ₹{product.price}</p>
                            <p ><span style={{ fontWeight: "bold", fontSize: "14px" }}>Indiaction:</span> {product.indication}</p>
                            <p> <span style={{ fontWeight: "bold", fontSize: "14px" }}>Dosage:</span> {product.indication}</p>
                            <p> <span style={{ fontWeight: "bold", fontSize: "14px" }}>Side Effects:</span> {product.dosage}</p>
                        </div>
                    </div>
                    <div className="productscreen__right">
                        <div className="right__info">
                            <p>
                                Price:
                                <span>₹{product.price * qty}/-</span>
                            </p>
                            <p>
                                Status:
                                <span>
                                    {product.countInStock - qty > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </p>
                            <p>
                                Qty
                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </p>
                            <p>
                                <button type="button" onClick={addToCartHandler}>
                                    Add To Cart
                                </button>
                            </p>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default ProductDetails;
