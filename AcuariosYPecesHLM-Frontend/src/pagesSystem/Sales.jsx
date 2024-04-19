import axios from "axios";
import React, { useEffect, useState }  from "react";
import { useStore } from "react-redux";

const Sales = () => {
    //Para ventas
    const [sales, setSales] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(()=>{
        axios.get("api/sales/all",{
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((res)=> {
                setSales(res.data);
                console.log(res.data);
          }).catch((err)=> {
            console.log(err);
          });
    },[]);

    const [newSale, setNewSale] = useState({
        details: 'Venta en tienda Fisica',
        finalAmount: 1500.00,
        paidMethod: ['EFECTIVO'],
        taxes: [20],
        employeeId: 1,
        cartId: 2,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        axios.post("api/sales/", newSale, {
            headers: {
                Authorization: `Bearer ${token}`
              }
        }).then((res)=> {
            console.log(res.data);
        }).catch((err)=> {
            console.log(err);
        });
    };

    const handleInput = async (e) => {
        setNewSale({ ...newSale, [e.target.name]: e.target.value });
        console.log(newSale);
    };

    //Para carrito
    const [cartDetails, setCartDetails] = useState([]);
    const [clientsList, setClientsList] = useState([]);
    const [howManyProducts, setManyProducts] = useState({ products: '' });
    const [products, setProducts] = useState([]);

    useEffect(()=> {
        axios.get('api/clients/clientStore', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setClientsList(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    useEffect (() => {
        axios.get("api/products/all")
        .then((response )=> {
            console.log(response.data);
            setProducts(response.data);
        })
        .catch((err)=> {
            console.log(err);
        });
    },[]);

    const handleQuantityToBuy = async (e) => {
        setManyProducts({ ...howManyProducts, [e.target.name]: e.target.value });
        console.log(howManyProducts);
    };

    const addToList = (e) => {
        e.preventDefault();
        setCartDetails([...cartDetails, newCartDetail]);
        setNewCartDetail({
            quantity: 0,
            amount: 0,
            productId: 0,
            rut: ''
        });
    };

    const handleInputDetails = (e, index) => {
        const { name, value } = e.target;
        const updatedDetails = [...cartDetails];
        if (!updatedDetails[index]) {
            updatedDetails[index] = {}; // Inicializa el objeto si aún no existe
        }
        updatedDetails[index][name] = value;
        setCartDetails(updatedDetails);
    };
    

    const removeItem = (index) => {
        const updatedDetails = [...cartDetails];
        updatedDetails.splice(index, 1);
        setCartDetails(updatedDetails);
    };

    return (
        <>
            {/* quantity: 0, amount: 0, productId: 0, rut: '' */}
            <form className="flex flex-col gap-4 items-center text-white" onSubmit={handleSubmit}>
                <h3>Registrar Venta</h3>
                <h4>¿Cuántos productos diferentes lleva?</h4>
                <input className="text-black" type="number" name="products" value={howManyProducts.products} placeholder="Cantidad de productos" onChange={handleQuantityToBuy}/>
                
                {howManyProducts.products > 0 ? 
                    Array.from({ length: howManyProducts.products }).map((_, index) => (
                        <div key={index} className="flex gap-4 items-center text-black">
                            <input type="number" name="quantity" value={cartDetails[index]?.quantity || 0} placeholder="Cantidad" onChange={(e) => handleInputDetails(e, index)} />
                            <input type="number" name="amount" value={cartDetails[index]?.amount || 0} placeholder="Precio" onChange={(e) => handleInputDetails(e, index)} />
                            <input type="text" name="rut" value={cartDetails[index]?.rut || ''} placeholder="RUT" onChange={(e) => handleInputDetails(e, index)} />
                            <select name="productId" value={cartDetails[index]?.productId || 0} onChange={(e) => handleInputDetails(e, index)}>
                                <option value="#" disabled>Seleccione un producto</option>
                                {products.map((product) => (
                                    <option key={product.productoDOTID} value={product.productoDOTID}>
                                        {product.name} | {product.provider}
                                    </option>
                                ))}
                            </select>
                            <button className="text-white bg-slate-400 p-2 rounded-md" onClick={() => removeItem(index)}>Eliminar producto</button>
                        </div>
                    ))
                    : <h4>Ingrese una cantidad mayor a 0 para iniciar la compra</h4>
                }

                
                <select className="text-black">
            <option value="#">Seleccione un cliente</option>
            {clientsList.map((client) => 
                <option key={client.ClientStoreID} value={client.ClientStoreID}>
                    {client.name} | RUT: {client.rut}
                </option>
            )}
        </select>
                
                <button type="submit">Registrar venta</button>
            </form>
        </>
    );
}

export default Sales;
