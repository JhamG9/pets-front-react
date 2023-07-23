import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config/constants";

export const ProductsPage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}products`, {
        params: {
          page: 1,
          limit: 10,
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {products.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`} className="col">
            <div className="card h-100">
              <img src={product.image_url} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Precio: ${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
