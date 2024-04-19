import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CardsClientsStore from "./CardsClientsStore";
import { Link } from "react-router-dom";

function AllClientsStore() {
    const [clients, SetClients] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get("/api/clients/clientStore", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            SetClients(res.data)
            console.log("clients: ", clients)
        })
        .catch(err => console.log(err))
    }, [])
    return(
        <div className="flex flex-col gap-5 p-5 items-center">
            <Link to={"/admin/newClientStore"} className="self-center bg-green-900 border-2 border-white p-2 text-white">+Añadir Cliente</Link>

            <div className="flex flex-wrap gap-5 justify-center">
                {Object.keys(clients).length > 0 ? clients
                .map(client => <CardsClientsStore key={client.clientStoreID} client={client}>
                </CardsClientsStore>) : <h1>Cargando...</h1>}
            </div>
        </div>
    )
}

export default AllClientsStore;