import React, { useEffect, useState } from "react";
import axios from "axios";

const Purchases = () => {
  const token = localStorage.getItem("token");

  const [purchases, setPurchases] = useState([]);

  const [newPurchase, setNewPurchase] = useState({
    quantity: 0,
    details: "",
    unitCost: 0.0,
    providerID: '',
    productID: 0,
  });

    function handleSubmit(e) {
      e.preventDefault()
      axios.post("api/purchase/newPurchase", newPurchase, {
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
    setNewPurchase({ ...newPurchase, [e.target.name]: e.target.value });
    console.log(newPurchase)
  };

  useEffect(() => {
    axios
      .get("api/purchase/all", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((res) => {
        console.log(res.data);
        setPurchases(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const [productList, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("api/products/all")
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [providerList, setProvider] = useState([]);

  useEffect(() => {
    axios
      .get("api/provider/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProvider(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const color1 = "border border-white border-double font-bold text-center mt-11 mx-2 h-11 w-full text-white max-w-[24rem] bg-gray-900"
  const color2 = "font-bold text-center mt-11 mx-2 h-11 w-full text-black max-w-[24rem] bg-gray-300"

  return (
    <div className="flex flex-col items-center ">

      <div className=" justify-center items-center gap-10 mt-5">
        <h1 className="text-white text-2xl text-center">Compras</h1>
        <div className="flex w-full mb-5 gap-3">
          <button
            onClick={handleclick1}
            className={visual1 ? color1 : color2}
          >
            Ver Compras
          </button>
          <button
            onClick={handleclick2}
            className={visual2 ? color1 : color2}
          >
            +Nueva Compra
          </button>
        </div>
        <div className="border-t border-2 border-white w-[50rem]"></div>

      </div>

      {visual1 && (
        <div>

          <div className="text-white flex flex-col justify-center items-center mt-8 gap-3">

            {Object.keys(purchases).length > 0 ? (
              purchases.map((purchase) =>
                <div key={purchase.purchaseID} className="border-y-2 bg-gray-900 bg-opacity-70 borderflex flex-col gap-2 min-w-[25rem] p-5 min-h-[5rem] max-w-[20rem] text-white">
                  <p>Detalles: {purchase.details}</p>
                  <p>Fecha: {purchase.date.slice(0,10)}</p>
                  <p>Costo Total: {purchase.totalCost.toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}</p>
                </div>
              )
            ) : (
              <p className="border-b-2 border-white text-2xl text-red-500">
                No hay compras registradas
              </p>
            )}
          </div>
        </div>
      )}
      {visual2 && (
        <main className="mt-5 flex flex-col">
          <form onSubmit={handleSubmit} className="w-[50rem] self-center">
            <fieldset className="flex flex-col gap-5 text-white">

            <label className="flex flex-col">Cantidad
                <input
                  className="text-black pl-2"
                  type="number"
                  placeholder="Cantidad"
                  name="quantity"
                  value={newPurchase.quantity}
                  onChange={handleInput}
                />
                </label>
                <label className="flex flex-col">Detalle
                <input
                  className="text-black pl-2"
                  type="text"
                  placeholder="Detalle"
                  name="details"
                  value={newPurchase.details}
                  onChange={handleInput}
                />
                </label>
                {/* <input className="text-center h-8 rounded-lg" type="date" value={newPurchase.date} onBlur={handleInput}/> */}
                <label className="flex flex-col">Número
                <input
                 className="text-black pl-2"
                  type="number"
                  name="unitCost"
                  placeholder="Costo Unitario"
                  value={newPurchase.unitCost}
                  onChange={handleInput}
                />
                </label>
                <label className="flex flex-col">Proveedor
                <select
                  className="text-black pl-2"
                  name="providerID"
                  id=""
                  value={newPurchase.providerID}
                  onChange={handleInput}
                >
                  <option value="#" selected >
                    Seleccione un proveedor
                  </option>
                  {providerList.map((provider) => (
                    <option
                      key={provider.providerID}
                      value={provider.providerID}
                    >
                      {provider.name}
                    </option>
                  ))}
                </select>
                </label>
                <label className="flex flex-col">Producto
                <select
                  className="text-black pl-2"
                  name="productID"
                  id=""
                  value={newPurchase.productID}
                  onChange={handleInput}
                >
                  <option value="#" selected disabled>
                    Seleccione un producto
                  </option>
                  {productList.map((product) => (
                    <option
                      key={product.id}
                      value={product.productoDTOID}
                    >
                      {product.name} de: {product.provider}
                    </option>
                  ))}
                </select>
                </label>
                <div className="flex justify-end">
                    <button className="m-5 py-2 px-3 border-2 border-whit2 bg-green-900 text-white" type="submit">Registrar</button>
                </div>
              </fieldset>
              
            </form>
          </main>
        
      )}
    </div>
  );
};

export default Purchases;
