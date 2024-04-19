import React from "react";

function CardProvider({provider}) {

    return(
        <div className="flex flex-col gap-2 min-w-[25rem] p-5 bg-gray-200 border border-black rounded-2xl min-h-[11rem] max-w-[20rem]">
            <div className="text-center">{provider.name}</div>
            <div>Télefono: {provider.phone}</div>
            <div>Email: {provider.email}</div>
            <div>RUC: {provider.ruc}</div>
            <div>Dirección: {provider.adress}</div>
        </div>
    )
}

export default CardProvider;