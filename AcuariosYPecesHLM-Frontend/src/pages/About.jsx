import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      <section className="text-black bg-white ">
        <div className="container px-5 py-10 mx-auto flex flex-col sm:py-5">
          <div className="lg:w-[1100px] mx-auto">
            <div className="rounded-lg h-[27rem] overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="../public/imgAbout.jpg"
              ></img>
            </div>
            <div className="flex flex-col md:flex-row mt-10 sm:mt-5">
              <div className="md:w-1/3 text-center md:pr-8 md:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-700 text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-black text-lg">
                    Luis Carrascal
                  </h2>
                  <div className="w-12 h-1 bg-[#48B0D9] rounded mt-2 mb-4"></div>
                  <p className="text-base text-justify">
                    Soy el creador de este hermoso negocio, por 8 años que me he
                    dedicado al mundo de los peces, te comparto quienes somos
                  </p>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-8 md:py-8 md:border-l border-gray-800 md:border-t-0 border-t mt-4 pt-4 md:mt-0 text-center md:text-left">
                <p className="leading-relaxed text-lg mb-4 text-justify	">
                  En Acuarios y Peces HLM, nos apasiona proporcionarte las
                  herramientas y conocimientos necesarios para explorar el
                  maravilloso mundo de los acuarios y los peces. Ya seas un
                  aficionado entusiasta o un profesional experimentado, nuestro
                  objetivo es ser tu socio de confianza en cada paso del camino.<br/><br/>
                  Desde la selección del acuario perfecto hasta la creación de
                  un entorno acuático próspero y equilibrado, estamos aquí para
                  ayudarte a hacer realidad tus sueños acuáticos. Con una amplia
                  gama de productos de calidad y un equipo dedicado de expertos
                  en acuarios, estamos comprometidos a brindarte una experiencia
                  excepcional en el cuidado de peces y acuarios. Únete a
                  nosotros en nuestro viaje para explorar la belleza y la
                  tranquilidad del mundo submarino y descubre todo lo que
                  Acuarios y Peces HLM tiene para ofrecer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
