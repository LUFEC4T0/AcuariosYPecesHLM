import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";

function NewClientStore() {
    const [clientStore, setClientStore] = useState({name: "", lastName: "", phone: "", rut: "", adress: ""})
    const token = localStorage.getItem('token')

    function handleSubmit(e) {
        e.preventDefault()
        axios.post("/api/auth/register/clientStore", clientStore, {
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
        setClientStore({...clientStore, [e.target.name]: e.target.value });
    }

    return (
        <main className="m-5 flex flex-col">
            <h1 className=" text-white text-2xl  text-center mb-5">Agregar un nuevo cliente</h1>
            <div className="border-t border-2 border-white w-[50rem] self-center mb-5"></div>
            <form className="w-[50rem] self-center" onSubmit={handleSubmit}>
                <fieldset className="flex flex-col gap-5 text-white">
                    <label className="flex flex-col">Nombre
                        <input className="text-black pl-2" type="text" name="name" value={clientStore.name} onInput={handleInput}  />
                    </label>
                    <label className="flex flex-col">Apellido
                        <input className="text-black pl-2" type="text" name="lastName" value={clientStore.lastName} onInput={handleInput} />
                    </label>
                    <label className="flex flex-col">Celular
                        <input className="text-black pl-2" type="text" name="phone" value={clientStore.phone} onInput={handleInput} />
                    </label>
                    <label className="flex flex-col">RUT
                        <input className="text-black pl-2" type="text" name="rut" value={clientStore.rut} onInput={handleInput} />
                    </label>
                    <label className="flex flex-col">Dirección
                        <input className="text-black pl-2" type="text" name="adress" value={clientStore.adress} onInput={handleInput} />
                    </label>
                </fieldset>
                <div className="flex justify-end">
                    <button className="m-5 py-2 px-3 border-2 border-white bg-green-900 text-white " type="submit">Registrar</button>
                </div>
            </form>
        </main>
    )
}

export default NewClientStore;