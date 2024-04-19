import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Login from './Login'

const Register = () => {
    const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", password: "", phone: "", adress: ""});
    const dispatch = useDispatch();
    const { login, current } = authActions;
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        axios.post('/api/auth/register', userData)
            .then(res => {
                console.log(res.data)
                if (res.data == "Your account was created successfully") {
                    console.log(userData.email, userData.password);
                    axios.post('/api/auth/login', {email:userData.email, password:userData.password})
                        .then(res => {
                            localStorage.setItem("token", res.data)
                            dispatch(login(res.data))
                            axios.get("/api/current/", {
                                headers: {
                                    Authorization: `Bearer ${res.data}`,
                                }
                                })
                                .then(response => {
                                    dispatch(current(response.data));
                                })
                                .catch(error => console.log(error));
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        console.log(userData)
    }

    return (
        <>
            <div className="min-h-screen flex justify-center  py-12 px-4 sm:px-6 lg:px-8 items-center bg-gradient-to-br from-[#A62190] via-[#6583BF] to-[#48B0D9]">
                <div className="space-y-8 p-10 bg-white rounded-xl z-10">
                    <div className='flex justify-center gap-[6rem]'>
                        <img className='max-w-[5rem] py-2' src="../public/Acuarios HLM logo color (sin letras) PNG.png" alt="" />
                        <div className='text-center'>
                            <h1 className='mt-6 text-3xl font-bold text-gray-900'>HLM</h1>
                            <p className="mt-2 text-md text-gray-600">Acuarios y Peces</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className='border-t-2 border-black '></div>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900">
                            ¡Registrate!
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">Completa los datos solicitados</p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        <div className='flex flex-wrap justify-between'>
                            <div className="w-[49%]">
                                <label className="text-sm font-bold text-gray-700 tracking-wide">Primer Nombre</label>
                                <input className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" value={userData.firstName} name='firstName' onChange={handleChange} type="text" placeholder="Juan"></input>
                            </div>
                            <div className="w-[49%]">
                                <label className="text-sm font-bold text-gray-700 tracking-wide">Primer Apellido</label>
                                <input className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" value={userData.lastName} name='lastName' onChange={handleChange} type="text" placeholder="Lopez"></input>
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            <div className="w-[49%]">
                                <label className="text-sm font-bold text-gray-700 tracking-wide">Telefono</label>
                                <input className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" value={userData.phone} name='phone' onChange={handleChange} type="text" placeholder="313-123-4567"></input>
                            </div>
                            <div className="w-[49%]">
                                <label className="text-sm font-bold text-gray-700 tracking-wide">Direccion</label>
                                <input className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" value={userData.adress} name='adress' onChange={handleChange} type="adress" placeholder="Calle 123 # 123 - 123"></input>
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            <div className="w-[49%]">
                                <label className="text-sm font-bold text-gray-700 tracking-wide">Correo electronico</label>
                                <input className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" value={userData.email} name='email' onChange={handleChange} type="email" placeholder="juanlopez@example.com"></input>
                            </div>
                            <div className="w-[49%]">
                                <label className="text-sm font-bold text-gray-700 tracking-wide">Contraseña</label>
                                <input className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" value={userData.password} name='password' onChange={handleChange} type="password" placeholder="************"></input>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"></input>
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Recuérdame
                                </label>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center bg-[#48B0D9] text-gray-100 p-4  rounded-full tracking-widefont-semibold  focus:outline-none focus:shadow-outline hover:bg-[#357e9b] shadow-lg cursor-pointer transition ease-in duration-300">
                                Registrarme
                            </button>
                        </div>
                        <div className="flex items-center justify-center mt-10 text-center text-md text-gray-500">
                            <p> ¿Tienes una cuenta? </p>
                            <Link to="/Login"  className="text-[#48B0D9] hover:text-[#357e9b] no-underline cursor-pointer transition ease-in duration-300"> Iniciar sesion </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register