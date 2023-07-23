import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../../config/constants';

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { handleSubmit, register, setValue, getValues } = useForm({ defaultValues: { quantity: 1 } });

  const onSubmit = async(data) => {
    const response = await axios.post(`${API_URL}cart`, {...data, product_id: product._id},{
      headers:{
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}products/${id}`);
        setProduct(response.data.data); 
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleIncreaseQuantity = () => {
    const currentValue = getValues('quantity');
    setValue('quantity', currentValue + 1 <= 100 ? currentValue + 1 : 100);
  };

  const handleDecreaseQuantity = () => {
    const currentValue = getValues('quantity');
    setValue('quantity', currentValue - 1 >= 1 ? currentValue - 1 : 1);
  };

  const goListProducts = () =>{
    navigate('/products');
  }

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div>

      <button onClick={goListProducts} >Atras</button>
       <div className="row">
        {/* Columna izquierda para la imagen */}
        <div className="col-lg-6">
          <img src={product.image_url} className="img-fluid" alt={product.name} />
        </div>

        {/* Columna derecha para los detalles */}
        <div className="col-lg-6">
          <h1>{product.name}</h1>
          <p>
            <strong>Descripción:</strong> {product.description}
          </p>
          <p>
            <strong>Precio:</strong> ${product.price}
          </p>
          <p>
            <strong>Cantidad:</strong> {product.quantity}
          </p>
          <p>
            <strong>Características:</strong> {product.characteristics}
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="quantityInput" className="form-label">
                <strong>Cantidad:</strong>
              </label>
              <div className="input-group">
                <span className="input-group-btn">
                  <button type="button" className="btn btn-secondary" onClick={handleDecreaseQuantity }>
                    -
                  </button>
                </span>
                <input
                  {...register('quantity')}
                  id="quantityInput"
                  className="form-control"
                  type="number"
                  min="1"
                  required
                  max="100"
                />
                <span className="input-group-btn">
                  <button type="button" className="btn btn-secondary" onClick={handleIncreaseQuantity}>
                    +
                  </button>
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Agregar al carrito</button>
          </form>


        </div>
      </div>
    </div>
  );
}
