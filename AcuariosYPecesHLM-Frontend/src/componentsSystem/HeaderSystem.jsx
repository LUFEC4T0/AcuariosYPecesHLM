import React from "react";

function HeaderSystem() {
    return (
        <main className="flex flex-col w-full bg-gray-900">
            <div className="flex flex-row justify-between px-5 w-full items-center">
                <img className='w-[3rem] py-2' src="../public/Acuarios HLM logo blanco (sin letras) PNG.png" alt="" />
                <h1 className="font-bold text-white text-xl">System HLM</h1>
                <div></div>
            </div>
            <img className='w-[100%] h-[1.5rem]' src="../public/barraFooter.png" alt="" />
            
        </main>
    )
}

export default HeaderSystem;