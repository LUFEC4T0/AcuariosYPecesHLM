import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardSales from "./CardSales";

function SalesDetails() {
    const {id} = useParams()
    const [sales, setSales] = useState([])
    const [employee, setEmployee] = useState({})
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get(`/api/employees/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setSales(res.data.sales)
            setEmployee(res.data)
        }
        )
        .catch(err => console.log(err))
    }, [])

    return (
        <main className="flex flex-col m-5 gap-2 items-center">
            <h1 className=" text-white text-2xl text-center mb-5">Ventas de {Object.keys(employee).length > 0 ? employee.name + " " + employee.lastName : null}</h1>
            <div className="border-t border-2 border-white w-[50rem] self-center"></div>
            <div className="flex flex-col justify-center gap-5 m-11">
                {Object.keys(sales).length > 0 ? sales.map(sale => <CardSales key={sale.id} sale={sale}></CardSales>) : <h1 className="font-bold text-red-600 text-xl">No hay ventas registradas</h1>}
            </div>
        </main>
    )
}

export default SalesDetails;