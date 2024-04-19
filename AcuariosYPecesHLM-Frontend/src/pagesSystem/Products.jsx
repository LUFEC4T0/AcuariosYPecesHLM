import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";


const Product = () => {

    const [visual1, setVisual1] = useState(true);
    const [visual2, setVisual2] = useState(false);
    const token = localStorage.getItem('token')

    function handleclick1(e) {
        setVisual1(true)
        setVisual2(false)
        console.log(`visual 1: ${!visual1}`)
        console.log(`visual 2: ${visual2}`)
    }

    function handleclick2(e) {
        setVisual1(false)
        setVisual2(true)
        console.log(`visual 1: ${visual1}`)
        console.log(`visual 2: ${!visual2}`)
    }

    const [newProduct, setNewProduct] = useState({
        revenue: 0,
        name: "",
        details: "",
        brand: '',
        category: "",
        imageURL: ""
    });

    function handleSubmit(e) {
        e.preventDefault()
        axios.post("/api/products/newProduct", newProduct, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res.data);
            swal({
                text: res.data,
                icon: "success",
                button: "accept",
                timer: "2000"
            })
        })
        .catch(err => {
            console.log(err)
            swal({
                text: err.response.data,
                icon: "error",
                button: "accept",
                timer: "2000"

            })
        })
    }

    function handleInput(e) {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
        console.log(newProduct)
    };


    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get("api/products/all")
            .then((response) => {
                console.log(response.data)
                setProducts(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    console.log(products)
    const color1 = "border border-white border-double font-bold text-center mt-11 mx-2 h-11 w-full text-white max-w-[24rem] bg-gray-900"
    const color2 = "font-bold text-center mt-11 mx-2 h-11 w-full text-black max-w-[24rem] bg-gray-300"

    return (
        <>

            <main className="flex flex-col justify-center items-center m-5">
                <h1 className=" text-white text-2xl  text-center">Lista de Productos</h1>
                <div className="flex w-full justify-center mb-5 gap-3">
                    <button onClick={handleclick1} className={visual1 ? color1 : color2}>Ver Productos</button>
                    <button onClick={handleclick2} className={visual2 ? color1 : color2}>+Nuevo Producto</button>
                </div>
                <div className="border-t border-2 border-white w-[50rem] self-center mb-5"></div>
                {visual1 && 
                <table className="min-w-[45rem] text-white">
                        <tr>
                            <th className="border h-[4em]">Artículo</th>
                            <th className="border">Detalle</th>
                            <th className="border">Stock</th>
                            <th className="border">Proveedor</th>
                        </tr>
                        {products.map(product => (
                            <tr key={product.id} >
                                <td className="border pl-2 h-[4em]">{product.name}</td>
                                <td className="border pl-2">{product.details}</td>
                                <td className="border text-center">{product.stock}</td>
                                <td className="border pl-2">{product.provider}</td>
                            </tr>
                        ))}
                </table>}
                {visual2 && <div className="mt-5 flex flex-col">
                        <form onSubmit={handleSubmit} className="w-[50rem] self-center">
                            
                            <fieldset  className="flex flex-col gap-5 text-white">
                                <label className="flex flex-col">Ganancia
                                    <input className="text-black pl-2" type="number" name="revenue" value={newProduct.revenue} placeholder="Ganancia" onInput={handleInput} />
                                </label>
                                <label className="flex flex-col">Nombre
                                    <input className="text-black pl-2" type="text" name="name" value={newProduct.name} placeholder="Nombre"  onInput={handleInput}/>
                                </label>
                                <label className="flex flex-col">Marca
                                    <input className="text-black pl-2" type="text" name="brand" value={newProduct.brand} placeholder="Marca" onInput={handleInput}/>
                                </label>
                                <label className="flex flex-col">Categoría
                                    <select className="text-black pl-2" name="category" id="" value={newProduct.category} onInput={handleInput}>
                                        <option defaultValue="#">Seleccione una categoria</option>
                                        {products.map((product) => (<option key={product.id}>{product.category}</option>))}
                                </select>
                                </label>
                                <label className="flex flex-col">Detalles
                                    <input className="text-black pl-2" type="text" name="details" value={newProduct.details} placeholder="Details" onInput={handleInput}/>
                                </label>
                                <label className="flex flex-col">URL imágen
                                    <input className="text-black pl-2" type="text" name="imageURL" value={newProduct.imageURL} placeholder="ImageURL" onInput={handleInput}/>
                                </label>
                            </fieldset>
                            <div className="flex justify-end">
                                <button className="m-5 py-2 px-3 border-2 border-whit2 bg-green-900 text-white" type="submit">Registrar</button>
                            </div>
                        </form>

                </div>}
            </main>


        </>
    )
}



export default Product;