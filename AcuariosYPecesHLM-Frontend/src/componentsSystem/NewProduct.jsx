import React, { useEffect, useState } from "react";
import axios from "axios"



const NewProduct = () => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8080/api/products/newProduct", product, {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setProduct(response.data)
            console.log(response)
        })
        .catch(error => {
            console.log("Error to conecct productos" + error)
        })
    },[])



    return (
        <>
            
        
        </>
    )



}


export default NewProduct;