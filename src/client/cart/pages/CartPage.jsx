import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config/constants";

export const CartPage = () => {

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cart', {
        params: {
          page: 1,
          limit: 10,
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
    }
  };

  const deleteOfCart = async(id) =>{
    try {
      await axios.delete(`${API_URL}cart/${id}`);
      alert('Eliminado correctamente');
      fetchProducts();      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {products.map((product) => (
          
          <div key={product._id}  className="col">
            <Link to={`/products/${product.product_id._id}`} className="card h-100">
              <img src={product.product_id.image_url} className="card-img-top" alt={product.product_id.name} />
              <div className="card-body">
                <h5 className="card-title">{product.product_id.name}</h5>
                <p className="card-text">Precio: ${product.product_id.price}</p>
                <p className="card-text"><strong>Cantidad:</strong> {product.quantity}</p>

              </div>
            </Link>
            <button onClick={() => deleteOfCart(product._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  )
}
