import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Menu() {
    const className1 = "inactive border min-w-[11rem] text-center font-bold bg-white";
    const navigate = useNavigate()

    function handleClick(e) {
        localStorage.removeItem('token')
        swal({
            text: "Sesión Cerrada",
            icon: "error",
            button: "accept",
            timer: "2000"

        })
        navigate('/login')
    }
    return (
        <>
            <div className="max-w-96">
                <div className="flex flex-col max-h-[33rem] rounded-xl bg-gray-900 bg-opacity-90 items-center p-10 m-5 min-w-[20rem] gap-10 h-full border-2 border-white">

                    <NavLink to="/admin/viewAllClients" activeClassName="active" exact={true} className="inactive border min-w-[11rem] text-center font-bold bg-white">Clientes</NavLink>
                    <NavLink to="/admin/viewAllProviders" activeClassName="active" exact={true} className="inactive border min-w-[11rem] text-center font-bold bg-white">Proveedores</NavLink>
                    <NavLink to="/admin/products" activeClassName="active" exact={true} className="inactive border min-w-[11rem] text-center font-bold bg-white">Productos</NavLink>
                    <NavLink to="/admin/purchases" activeClassName="active" exact={true} className="inactive border min-w-[11rem] text-center font-bold bg-white">Compras</NavLink>
                    <NavLink to="/admin/viewAllEmployees" activeClassName="active" exact={true} className="inactive border min-w-[11rem] text-center font-bold bg-white">Empleados</NavLink>
                    <div className={className1 + "border-white"}></div>
                    <div className="flex flex-row gap-5">
                        <img onClick={handleClick} className="max-w-8 max-h-8 px-1 self-center" src="../../public/cerrarSesion.png" alt="Puerta abierta" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu; 