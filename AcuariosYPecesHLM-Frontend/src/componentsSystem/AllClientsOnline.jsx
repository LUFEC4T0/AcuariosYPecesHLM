import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CardsClientsOnline from "./CardsClientsOnline";

function AllClientsOnline() {
    const [clients, SetClients] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get("/api/clients/clientOnline", {
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
        <div className="flex flex-wrap gap-5 p-5 justify-center">
            {Object.keys(clients).length > 0 ? clients
            .map(client => <CardsClientsOnline key={client.clientOnlineID} client={client}>
            </CardsClientsOnline>) : <h1>Cargando...</h1>}
            
        </div>
    )
}

export default AllClientsOnline;