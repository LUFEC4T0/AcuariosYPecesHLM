import React from "react";
import { Link } from "react-router-dom";

function CardsEmployees({employee}) {

    return (
        <main className="flex flex-col gap-2 min-w-[25rem] m-5 p-5 bg-gray-200 border border-black rounded-2xl min-h-[11rem] max-w-[20rem]">

            <div>Nombre: {employee.name}</div>
            <div>Apellido: {employee.lastName}</div>
            <div>Email: {employee.email}</div>
            <div>Puesto: {employee.workPosition}</div>
            <Link to={`/admin/salesDetails/${employee.employeeID}`} className="font-bold underline self-end text-green-900">Ver Ventas</Link>

        </main>
    )
}

export default CardsEmployees;