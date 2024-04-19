import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardsCart from "./CardsCart";

function CartsDetails() {
    const {id, tipo} = useParams()
    const token = localStorage.getItem('token')
    const [carts, setCarts] = useState([])
    const [client, setClient] = useState({})
    

    useEffect(() => {
        if (tipo == "store") {
            console.log("Entró Store")
            axios.get(`/api/clients/clientStore/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(
                res => {
                    setCarts(res.data.carts)
                    setClient(res.data)
                }
            )
            .catch(err => console.log(err))
    
        } else if (tipo == "online") {
            console.log("Entró online")
            axios.get(`/api/clients/clientOnline/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(
                res => {
                    console.log(res.data.carts)
                    setCarts(res.data.carts)
                    setClient(res.data)
                }
            )
            .catch(err => console.log(err))
        }
    }, [id, tipo, token])

    return(
        <main className="flex flex-col m-5 gap-2 items-center">
            <h1 className="text-white text-2xl text-center mb-5">Compras realizadas por: {Object.keys(client).length > 0 ? client.name + " " + client.lastName : null}</h1>
            <div className="border-t border-2 border-white w-[50rem] self-center mb-5"></div>
            <div className="flex flex-col bg-gray-900 bg-opacity-70 gap-3">
                {Object.keys(carts).length > 0 ? carts.map(cart => cart.cartDetails.map(cartDetails => <CardsCart key={cartDetails.cartDetailsID} cartDetails={cartDetails}></CardsCart>)) : <h1 className="font-bold text-red-900 text-xl text-center m-11 text-red-600">Este cliente no posee compras realizadas</h1>}
            </div>
        </main>
)
}

export default CartsDetails;