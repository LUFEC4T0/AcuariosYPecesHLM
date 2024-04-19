import React from 'react'

const Footer = () => {
    return (
        <>
        <img className='w-[100%] h-[1.5rem]' src="../public/barraFooter.png" alt="" />
            <footer className="bg-gray-900 text-white text-center p-5 lg:h-[20rem] flex flex-wrap justify-around gap-5">
                <div className='flex flex-col w-[18rem] justify-between p-3'>
                    <img className='w-[5rem]' src="../public/Acuarios HLM logo blanco (sin letras) PNG.png" alt="" />
                    <p className='mt-3 text-justify text-[.9rem] text-[#c9c9c9]' >Ya seas un aficionado entusiasta o un profesional experimentado, nuestro objetivo es ser tu socio de confianza en cada paso del camino.</p>
                    <div className='flex gap-5 items-start'>
                        <a href="https://www.facebook.com/peces.hlm">
                        <img className='w-[1.3rem] mt-3' src="../public/logoFacebook.png" alt="" />
                        </a>
                        <a href='https://www.instagram.com/peces.hlm/'>
                        <img className='w-[1.3rem] mt-3' src="../public/logoInstagram.png" alt="" />
                        </a>
                        <a href='https://wa.me/3196820102'>
                        <img className='w-[1.3rem] mt-3' src="../public/logoWhatsapp.png" alt="" />
                        </a>
                    </div>
                    <p className='mt-3 text-[.7rem] text-[#c9c9c9] text-start'>&copy; 2022 Acuario Y Peces HLM. All rights reserved.</p>
                </div>
                <div className='flex flex-col w-[18rem] justify-center gap-3 p-3'>
                    <p className='text-start'>Paginas</p>
                    <div>
                        <a href='/'>
                            <p className='my-2 text-[#c9c9c9] text-[.9rem] text-start'>Inicio</p>
                        </a>
                        <a href='/shop'>
                        <p className='my-2 text-[#c9c9c9] text-[.9rem] text-start'>Tienda</p>
                        </a>
                        <a href='/about'>
                        <p className='my-2 text-[#c9c9c9] text-[.9rem] text-left'>Sobre Nosotros</p>
                        </a>
                        <a href='/login'>
                        <p className='my-2 text-[#c9c9c9] text-[.9rem] text-start'>Inicia Sesión</p>
                        </a>
                    </div>
                </div>
                <div className='flex flex-col w-[18rem] justify-center gap-3 p-3'>
                    <p className='text-start'>Contacto</p>
                    <div className='flex flex-col'>
                        <div className='flex items-center'>
                            <a href="https://wa.me/3196820102" className='flex flex-row items-center'>
                            <img className='w-[1rem] h-[1rem] mr-2' src="../public/logoTelefono.png" alt="" /><p className='my-2 text-[#c9c9c9] text-[.9rem]'>+57 319 682 0102</p>
                            </a>
                        </div>
                        <div className='flex items-center'>
                            <a href="mailto:acuarioypeceshlm@gmail.com" className='flex flex-row items-center'>
                            <img className='w-[1.2rem] h-[1.2rem] mr-2' src="../public/logoCorreo.png" alt="" /><p className='my-2 text-[#c9c9c9] text-[.9rem]'>acuarioypeceshlm@gmail.com</p>
                            </a>
                        </div>
                        <div className='flex items-center'>
                            <a className='flex flex-row items-center' href="https://www.google.com/maps/place/Acuarios+Y+Peces+HLM/@5.4869629,-74.676101,17z/data=!4m10!1m2!2m1!1sCalle+55+1B-39+La+Dorada,+Colombia!3m6!1s0x8e40df5c94e18b17:0x508fdcc16f1bc439!8m2!3d5.4869629!4d-74.6735261!15sCiJDYWxsZSA1NSAxQi0zOSBMYSBEb3JhZGEsIENvbG9tYmlhWiMiIWNhbGxlIDU1IDFiIDM5IGxhIGRvcmFkYSBjb2xvbWJpYZIBDWFxdWFyaXVtX3Nob3DgAQA!16s%2Fg%2F11tj6v5bg9?entry=ttu">
                            <img className='w-[1.2rem] h-[1.2rem] mr-2' src="../public/logoUbicacion.png" alt="" /><p className='my-2 text-[#c9c9c9] text-[.9rem]'>Calle 55 # 1B-39 (La Dorada)</p>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
            <img className='w-[100%] h-[1.5rem]' src="../public/barraFooter.png" alt="" />
        </>
    )
}

export default Footer