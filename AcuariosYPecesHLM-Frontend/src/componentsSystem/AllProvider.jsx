import React, {useEffect, useState} from "react";
import axios from "axios";
import CardProvider from "./CardProvider";

function AllProvider() {
    const [providers, setProviders] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get("api/provider/all", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setProviders(res.data)
            console.log(res.data)
        }).catch(err => console.log(err))
    }, [])

    return (
        <main className="flex flex-col m-5 gap-5 items-center">

            {Object.keys(providers).length > 0 ? providers.map(provider => 
                <CardProvider key={provider.providerID} provider={provider}></CardProvider> 
            ) : <h1 className="font-bold text-red-600 text-xl">No hay proveedores registrados</h1>}

        </main>
    )
}

export default AllProvider;