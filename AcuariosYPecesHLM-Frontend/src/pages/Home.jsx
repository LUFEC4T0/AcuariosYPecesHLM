import React from "react";
import Cards from "../components/Cards";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <main className="bg-white fondo">
                {/* <img className='' src={fondoImg} alt="" /> */}
                <div className="relative md:top-80 md:left-20 sm:top-[16rem] sm:left-[1.5rem] md2:left-20">
                    <Link to="/shop">
                        <button className="px-7 mx-2 py-3 text-white bg-[#A62190] rounded-full font-bold shadow-md sm:px-4 sm:py-2">
                            Tienda
                        </button>
                    </Link>
                    <Link to="/about">
                        <button className="px-7 mx-2 py-3 text-white bg-gray-900 rounded-full font-bold shadow-md sm:px-4 sm:py-2">
                            Nosotros
                        </button>
                    </Link>
                </div>
                <div className="container mx-auto py-8 posicion">
                    <h1 className="text-3xl font-bold text-center mb-8 text-white">
                        Productos Destacados
                    </h1>
                    <Cards />
                </div>
            </main>
            <section class="text-gray-600">
                <div class="container px-5 py-8 pb-12 mx-auto">
                    <div class="flex flex-wrap w-full mb-[3rem] flex-col items-center text-center">
                        <h1 class="sm:text-3xl text-3xl font-bold title-font mb-2 text-gray-900">
                            Nuestros servicios
                        </h1>
                        <p class="lg:w-1/2 w-full leading-relaxed text-gray-700">
                            Aparte de ser una excelente tienda online, nos
                            enfocamos en brindar unos excelentes servicios, de
                            la mejor forma posible.
                        </p>
                    </div>
                    <div class="flex flex-wrap -m-4">
                        <div class="xl:w-1/3 md:w-1/2 p-4">
                            <div class="border border-gray-200 p-6 rounded-lg">
                                <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <img
                                        src="../public/limpiezaLogo.png"
                                        alt=""
                                    />
                                </div>
                                <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                                    Limpieza de Acuarios
                                </h2>
                                <p class="leading-relaxed text-base">
                                    Ofrecemos la limpieza y mantenimiento
                                    regular de acuarios domésticos o comerciales
                                    para garantizar un entorno saludable y
                                    equilibrado para los peces y otras criaturas
                                    acuáticas.
                                </p>
                            </div>
                        </div>
                        <div class="xl:w-1/3 md:w-1/2 p-4">
                            <div class="border border-gray-200 p-6 rounded-lg">
                                <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <img src="../public/acuarioLogo.png" alt="" />
                                </div>
                                <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                                    Fabricacion de Acuarios
                                </h2>
                                <p class="leading-relaxed text-base">
                                    Ofrecemos el servicio de fabricación de
                                    acuarios a medida. Diseños personalizado
                                    hasta la construcción experta, nos
                                    encargamos de crear acuarios de calidad, que
                                    se adaptan perfectamente a tus necesidades y
                                    preferencias.
                                </p>
                            </div>
                        </div>
                        <div class="xl:w-1/3 md:w-1/2 p-4">
                            <div class="border border-gray-200 p-6 rounded-lg">
                                <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <img src="../public/tapaLogo.png" alt="" />
                                </div>
                                <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                                    Fabricacion de Tapas Acrilicas
                                </h2>
                                <p class="leading-relaxed text-base">
                                    Ofrecemos el servicio de fabricación de
                                    tapas para acuarios a medida. nos encargamos
                                    de crear tapas de calidad, con un excelente
                                    maaterial, que se adaptan perfectamente a
                                    tus necesidades y preferencias.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Home;
