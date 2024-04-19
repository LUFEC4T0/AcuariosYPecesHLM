import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const { login, current } = authActions;
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([])

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("api/auth/login", userData)

            .then(res => {
                dispatch(login(res.data))
                const token = localStorage.getItem('token')
                axios.get("/api/employees/", {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => res.data.map(employee => {
                    if(employee.email === userData.email) {
                        console.log("entró a Employee");
                        navigate("/admin")
                    }
                })).catch(err => console.log(err))
                navigate("/home")
            })
            .catch(err => {
                
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value });
        
    }
    console.log(userData)

    return (
        <>
            <div className="min-h-screen flex justify-center  py-12 px-4 sm:px-6 lg:px-8 items-center bg-gradient-to-br from-[#A62190] via-[#6583BF] to-[#48B0D9]">
                <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
                    <div className='flex justify-center gap-11'>
                        <img className='max-w-[5rem] py-2' src="../public/Acuarios HLM logo color (sin letras) PNG.png" alt="" />
                        <div className='text-center'>
                            <h1 className='mt-6 text-3xl font-bold text-gray-900'>HLM</h1>
                            <p className="mt-2 text-md text-gray-600">Acuarios y Peces</p>
                        </div>
                        
                    </div>
                    <div className="text-center">
                    <div className='border-t-2 border-black '></div>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            ¡Bienvenido de nuevo!
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">Inicie sesión en su cuenta</p>
                    </div>
                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        
                        <div className="relative">
                            
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Correo</label>
                            <input className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" value={userData.email} name="email" onChange={handleChange} type="email" placeholder="mail@gmail.com"></input>
                        </div>
                        <div className="mt-8 content-center">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Contraseña</label>
                            <input className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" value={userData.password} name="password" onChange={handleChange} type="password" placeholder="**************"></input>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"></input>
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Recuérdame
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-[#48B0D9] hover:text-[#357e9b]">
                                    ¿Ha olvidado su contraseña?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center bg-[#48B0D9] text-gray-100 p-4  rounded-full tracking-widefont-semibold  focus:outline-none focus:shadow-outline hover:bg-[#357e9b] shadow-lg cursor-pointer transition ease-in duration-300">
                                Iniciar sesion
                            </button>
                        </div>
                        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                            <span>¿No tiene una cuenta?</span>
                            <Link to="/register" className="text-[#48B0D9] hover:text-[#357e9b] no-underline cursor-pointer transition ease-in duration-300">Registrate</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
