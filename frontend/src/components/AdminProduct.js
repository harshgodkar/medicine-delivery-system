import "../styles/Product.css";
import { Link } from "react-router-dom";

const AdminProduct = ({ imgsrc, title, indication, dosage, sideEffects,price,productId }) => {

  let handleDeleteProduct = async (req, res) => {
    let response = await fetch(`http://localhost:5000/admin/deleteproduct/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    if(response.success){
      alert("Product Deleted...");
    }
    else{
      alert("Error Occured");
    }
  }

  return (
    <div className="product">
      <img src={imgsrc} alt={title} />

      <div className="product__info">
        <p style={{fontWeight: "bold",fontSize:"22px"}} className="info__name mt-4">{title}</p>

        <p  className="info__description"><span style={{fontWeight: "bold",fontSize:"14px"}}>Indiacation: </span>{indication}</p>
        <p  className="info__description"><span style={{fontWeight: "bold",fontSize:"14px"}}>Dosage: </span>{dosage}</p>
        <p  className="info__description"><span style={{fontWeight: "bold",fontSize:"14px"}}>Side Effects: </span>{sideEffects}</p>

        <p className="info__price">₹{price}</p>
        <div className="row">
        <Link to={`/admin/update/${productId}`} className="info__button col-3 mx-3">
          Update
        </Link>
        <Link onClick={handleDeleteProduct} className="info__button col-3 mx-3">
          Delete
        </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
