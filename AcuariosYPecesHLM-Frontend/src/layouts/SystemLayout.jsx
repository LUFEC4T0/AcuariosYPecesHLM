import React from "react";
import { Outlet } from 'react-router-dom';
import Menu from "../componentsSystem/Menu";
import HeaderSystem from "../componentsSystem/HeaderSystem";
import Footer from "../components/Footer";

function SystemLayout(props) {
    return (
        <div className="h-full bg-[url('/public/fondoSistem.png')]">
            <HeaderSystem/>
            <div className="flex flex-row h-full p-5 m-5 gap-5">

                <div className="flex fixed inset-y-[6.8em] min-h-[50rem] left-5">
                    <Menu/>
                </div>
                <div className="bg-gray-900 bg-opacity-80 w-screen min-h-screen rounded-xl ml-[21rem]">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SystemLayout