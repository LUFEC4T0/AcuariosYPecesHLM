import React, { useState } from "react";
import AllClientsOnline from "../componentsSystem/AllClientsOnline";
import AllClientsStore from "../componentsSystem/AllClientsStore";

function ViewAllClients() {
    const [visual1, setVisual1] = useState(true);
    const [visual2, setVisual2] = useState(false);

    function handleclick1(e) {
        setVisual1(true)
        setVisual2(false)
        console.log(`visual 1: ${!visual1}`)
        console.log(`visual 2: ${visual2}`)
    }

    function handleclick2(e) {
        setVisual1(false)
        setVisual2(true)
        console.log(`visual 1: ${visual1}`)
        console.log(`visual 2: ${!visual2}`)
    }

    const color1 = "border border-white border-double font-bold text-center mt-11 mx-2 h-11 w-full text-white max-w-[24rem] bg-gray-900"
    const color2 = "font-bold text-center mt-11 mx-2 h-11 w-full text-black max-w-[24rem] bg-gray-300"
    
    return (
            <main className="flex flex-col mt-5">
                <h1 className="text-white text-2xl text-center">Clientes</h1>
                <div className="flex justify-center gap-3">
                    <button onClick={handleclick1} className={visual1 ? color1 : color2}>Clientes Online</button>
                    <button onClick={handleclick2} className={visual2 ? color1 : color2}>Clientes Store</button>
                </div>
                <div className="border-t border-2 border-white w-[50rem] self-center mt-5"></div>
                
                {visual1 && <AllClientsOnline/>}
                {visual2 && <AllClientsStore/>}

            </main>
        
    )
}

export default ViewAllClients;