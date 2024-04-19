import React, { useEffect, useState } from "react";
import axios from "axios";

function CardsCart({cartDetails}) {
    const [product, setProduct] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get(`api/products/${cartDetails.productHolder}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res => setProduct(res.data)
        ).catch(err => console.log(err))

    }, [])
    

    return (
        <main className="flex flex-col gap-2 min-w-[25rem] p-5 border-y text-white border-white min-h-[11rem] max-w-[20rem]">
            {console.log(cartDetails)}
            {Object.keys(product).length > 0 ? <div className="">Producto: {product.name}</div> : <div className="">Producto ID: {cartDetails.productHolder}</div>}
            
            <div className="">Cantidad: {cartDetails.quantity}</div>
            <div className="">Amount: {cartDetails.amount.toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}</div>
            <div className="">Cart ID: {cartDetails.cartHolder}</div>
        </main>
    )
}

export default CardsCart