import React, { useEffect, useState } from "react";
import CardsEmployees from "../componentsSystem/CardsEmployees";
import axios from "axios";

function AllEmployees() {
    const [employees, setEmployees] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get("/api/employees/", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setEmployees(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <main className="flex flex-col m-5 items-center">
            <div className="flex flex-wrap justify-center">
                {Object.keys(employees).length > 0 ? employees.map(employee => <CardsEmployees key={employee.employeeID} employee={employee}></CardsEmployees>) : <h1 className="text-xl font-bold underline text-red-900 text-center m-5">No hay empleados registrados</h1>}
            </div>
        </main>
    )
}

export default AllEmployees;