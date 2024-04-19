import React, {useEffect, useState} from "react";
import axios from "axios";

function AddNewProvider() {
    const [provider, setProvider] = useState({ name: "", adress: "" , phone: "", RUC: "", email:""});
    const token = localStorage.getItem('token')

    function handleSubmit(e) {
        e.preventDefault()
        axios.post("api/provider/register", provider, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res.data);
            swal({
                text: res.data,
                icon: "success",
                button: "accept",
                timer: "2000"
            })
        })
        .catch(err => {
            console.log(err)
            swal({
                text: err.response.data,
                icon: "error",
                button: "accept",
                timer: "2000"

            })
        })
    }

    function handleInput(e) {
        setProvider({...provider, [e.target.name]: e.target.value });

    }

    return(
        <main className="mt-5 flex flex-col">
            <form onSubmit={handleSubmit} className="w-[50rem] self-center">
                <fieldset className="flex flex-col gap-5 text-white">
                    <label className="flex flex-col">Nombre
                        <input className="text-black pl-2" type="text" name="name" value={provider.name} onInput={handleInput}/>
                    </label>
                    <label className="flex flex-col">Dirección
                        <input className="text-black pl-2" type="adress" name="adress" value={provider.adress} onInput={handleInput}/>
                    </label>
                    <label className="flex flex-col">Teléfono
                        <input className="text-black pl-2" type="text" name="phone" value={provider.phone} onInput={handleInput}/>
                    </label>
                    <label className="flex flex-col">RUC
                        <input className="text-black pl-2" type="RUC" name="RUC" value={provider.RUC} onInput={handleInput}/>
                    </label>
                    <label className="flex flex-col">Email
                        <input className="text-black pl-2" type="email" name="email" value={provider.email} onInput={handleInput}/>
                    </label>
                </fieldset>
                <div className="flex justify-end">
                    <button className="m-5 py-2 px-3 border-2 border-whit2 bg-green-900 text-white" type="submit">Registrar</button>
                </div>
            </form>
            
        </main>
    )
}

export default AddNewProvider;