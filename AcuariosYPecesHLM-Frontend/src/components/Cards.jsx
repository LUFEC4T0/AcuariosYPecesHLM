import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import numberFormatter from '../utils/currencyformatter';


const Cards = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/api/products/all")
            .then(response => {
                console.log(response.data)
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const limitedProducts = products.slice(0, 6);

    const DiscountBadge = ({ percentage }) => (
        <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold py-1 px-2 rounded-tr-lg">
          {percentage}% OFF
        </div>
      );
      

      return (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-1   ">
          {limitedProducts.map(product => {
            const discountedPrice = product.finalPrice - (product.finalPrice * (product.promos / 100));
      
            return (
              <div key={product.id} className="relative bg-white rounded-lg shadow-lg p-4">
                {product.promos !== 0 && (
                  <div className="absolute rounded top-1 right-1 bg-[#A62190] text-white text-xs font-bold py-1 px-2 rounded-tr-lg">
                    {product.promos}% OFF
                  </div>
                )}
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <div className="mt-4 flex flex-wrap justify-between items-center">
                  <div className="flex flex-col">
                    {product.promos !== 0 ? (
                      <>
                        <span className="text-gray-400 text-sm line-through">{product.finalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        <span className="text-gray-800 font-bold">
                          {discountedPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-800 font-bold">
                        {product.finalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </span>
                    )}
                  </div>
                  <Link to={`/productdetails/${product.productoDTOID}`}>
                    <button className="ml-2 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                      Ver Detalle
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      );
      
};

export default Cards;

