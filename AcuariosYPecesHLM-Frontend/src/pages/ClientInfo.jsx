import React, { useState, useEffect } from "react";
import axios from "axios";
import CardsCartClient from "../components/CardsCartClient";

const ClientInfo = () => {
    const token = localStorage.getItem("token");
    const [clientData, setclientData] = useState();
    const [clientTab, setClientTab] = useState("personalData");
    const [editando, setEditando] = useState(false);
    const [datosEditados, setDatosEditados] = useState(clientData);
    const [product, setProduct] = useState([]);

    const changeTab = (clientab) => {
        setClientTab(clientab);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosEditados({ ...datosEditados, [name]: value });
    };

    const handleGuardar = () => {
        setclientData(datosEditados);
        setEditando(false);
        axios
            .post("/api/current/editData", datosEditados, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                alert("¡Datos actualizados!");
            })
            .catch((error) => {
                alert("¡Algo salió mal!");
            });
    };

    useEffect(() => {
        axios
            .get("/api/current/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const fetched = response.data;
                setclientData(fetched);
            })
            .catch((error) => {
                console.error("Hubo un problema con la solicitud:", error);
            });
    }, []);

    useEffect(() => {
        axios.get(`api/products/${2}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res => setProduct(res.data)
        ).catch(err => console.log(err))

    }, [])

    console.log(clientData);

    return (
        <>
            <div className="w-full flex justify-center lg:mt-10 mt-5 sm:mt-3 sm:h-[8rem]">
                <img className="rounded object-cover" src="../public/bannerClientInfo.png" alt="" />
            </div>
            <div className="flex justify-center mb-10">
                <div className="flex flex-row place-content-center place-items-center lg:w-[90%] w-full bg-white text-black text-center p-5 justify-around sm:flex-col">
                    <div className="lg:w-[20%] flex md:flex-col justify-center md:h-[20rem] gap-5 text-gray-900 md:p-3 rounded-xl sm:gap-2 sm:pb-2">
                        <button
                            className={`border-[2px] py-3 rounded-xl hover:bg-gray-900 hover:text-white hover:scale-95 shadow-3xl ${clientTab === "personalData"
                                ? "border-gray-900 bg-gray-900 text-white"
                                : "border-gray-500"
                                }`}
                            onClick={() => changeTab("personalData")}
                        >
                            Datos personales
                        </button>
                        <button
                            className={`border-[2px] py-3 rounded-xl hover:bg-gray-900 hover:text-white hover:scale-95 shadow-3xl ${clientTab === "personalAdress"
                                ? "border-gray-900 bg-gray-900 text-white"
                                : "border-gray-500"
                                }`}
                            onClick={() => changeTab("personalAdress")}
                        >
                            Dirección de Envío
                        </button>
                        <button
                            className={`border-[2px] py-3 rounded-xl hover:bg-gray-900 hover:text-white hover:scale-95 shadow-3xl ${clientTab === "shopHistory"
                                ? "border-gray-900 bg-gray-900 text-white"
                                : "border-gray-500"
                                }`}
                            onClick={() => changeTab("shopHistory")}
                        >
                            Historial de Compras
                        </button>
                    </div>
                    <div className="lg:w-2/4 md:w-3/4 flex flex-col rounded-xl shadow-3xl">
                        {clientData ? (
                            <div>
                                {clientTab === "personalData" && (
                                    <div className="flex flex-col gap-5 p-5">
                                        <h2 className="text-gray-900 text-3xl">
                                            {
                                                editando ? <strong>Edita tus datos</strong> :  <strong>Datos personales</strong>
                                            }       
                                        </h2>
                                        {editando ? (
                                            <div className="text-gray-300 flex flex-col gap-3 items-center mt-8">
                                                <div className="flex w-full justify-between text-start">
                                                    <div className="w-[49%]">
                                                        <label className="font-bold text-gray-700 tracking-wide">Nombre:</label>
                                                        <input
                                                            className=" w-full text-gray-400 py-2 border-b border-gray-200 focus:outline-none focus:border-gray-900"
                                                            type="text"
                                                            name="name"
                                                            value={datosEditados.name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="w-[49%]">
                                                        <label className="font-bold text-gray-700 tracking-wide">Apellido:</label>
                                                        <input
                                                            className=" w-full text-gray-400 py-2 border-b border-gray-200 focus:outline-none focus:border-gray-900"
                                                            type="text"
                                                            name="lastName"
                                                            value={datosEditados.lastName}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex w-full justify-between text-start mb-8">
                                                    <div className="w-[49%]">
                                                        <label className="font-bold text-gray-700 tracking-wide">Correo electrónico:</label>
                                                        <input
                                                            className=" w-full text-gray-400 py-2 border-b border-gray-200 focus:outline-none focus:border-gray-900"
                                                            type="email"
                                                            name="email"
                                                            value={datosEditados.email}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="w-[49%]">
                                                        <label className="font-bold text-gray-700 tracking-wide">Teléfono:</label>
                                                        <input
                                                            className=" w-full text-gray-400 py-2 border-b border-gray-200 focus:outline-none focus:border-gray-900"
                                                            type="tel"
                                                            name="phone"
                                                            value={datosEditados.phone}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <button
                                                        className="shadow-3xl border bg-gray-900 border-gray-900 text-white px-6 py-2 rounded-xl hover:bg-gray-700"
                                                        onClick={handleGuardar}
                                                    >
                                                        Guardar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="text-gray-300 flex flex-col gap-3 items-center mt-8">
                                                    <div className="flex w-full justify-between text-start">
                                                        <p className="border border-gray-800 rounded-md py-2 px-5 w-[49%] bg-gray-800">
                                                            <strong>Nombre:</strong> {clientData.name}
                                                        </p>
                                                        <p className="border border-gray-800 rounded-md py-2 px-5 w-[49%] bg-gray-800">
                                                            <strong>Apellido:</strong> {clientData.lastName}
                                                        </p>
                                                    </div>
                                                    <div className="flex w-full justify-between text-start">
                                                        <p className="border border-gray-800 rounded-md py-2 px-5 w-[49%] bg-gray-800">
                                                            <strong>Teléfono:</strong> {clientData.phone}
                                                        </p>
                                                        <p className="border border-gray-800 rounded-md py-2 px-5 w-[49%] bg-gray-800">
                                                            <strong>Dirección:</strong> {clientData.adress}
                                                        </p>
                                                    </div>
                                                    <div className="flex w-full text-start">
                                                        <p className="border border-gray-800 rounded-md py-2 px-5 bg-gray-800 w-full">
                                                            <strong>Correo electrónico:</strong>{" "}
                                                            {clientData.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        className="shadow-3xl border bg-gray-900 border-gray-900 text-white px-6 py-2 rounded-xl hover:bg-gray-700"
                                                        onClick={() => {
                                                            setDatosEditados(clientData);
                                                            setEditando(true);
                                                        }}
                                                    >
                                                        Editar
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                                {clientTab === "personalAdress" && (
                                    <div className="flex flex-col gap-6 items-center p-5">
                                        <h2 className="text-gray-900 text-3xl">
                                            <strong>Direccion de envio</strong>
                                        </h2>
                                        <p className="border border-gray-800 rounded-md py-2 px-5 w-[49%] bg-gray-800 text-gray-300 text-start">
                                            <strong>Dirección:</strong> {clientData.adress}
                                        </p>
                                    </div>
                                )}
                                {clientTab === "shopHistory" && (
                                    <div className="flex flex-col gap-6 items-center p-5">
                                        <h2 className="text-gray-900 text-3xl">
                                            <strong>Mis compras</strong>
                                        </h2>
                                        <table className="table-auto w-full shadow-2xl">
                                            <thead className="text-left text-gray-200 bg-gray-900 border border-gray-900">
                                                <tr>
                                                    <th className="px-4 py-2 text-center">Preducto</th>
                                                    <th className="px-4 py-2 text-center">Cantidad</th>
                                                    <th className="px-4 py-2 text-right">Precio</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-left border border-gray-700">
                                                {
                                                    clientData.carts.map((cart => cart.cartDetails.map(cartDetails => 
                                                        <CardsCartClient cartDetails={cartDetails} key={cartDetails.cartDetailsID} />
                                                    )))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>Error al obtener datos</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientInfo;
