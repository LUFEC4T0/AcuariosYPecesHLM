import React, { useState, useEffect } from 'react';
import { useCart } from '../utils/cart';
import axios from 'axios';

function Cart() {
  const shippingPrice = 100; 
  const { cart, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState(Array(cart.length).fill(1));
  const [cartDetail, setCartDetail] = useState();
  const [purchaseData,setPurchaseData] = useState({details:'',finalAmount:'',paidMethod:["DEBITO"],taxes:[21],cartId:'',employeeId: 1});
  const [cartId, setCartId] = useState(0);
  const token = localStorage.getItem("token")

  useEffect(() => {
    const cartarray = [];
  
    cart.forEach((product, index) => {
      cartarray.push({
        productoId: product.productoDTOID,
        amount: product.finalPrice * (1 - product.promos / 100),
        quantity: quantities[index]
      });
    });
  setCartDetail(cartarray)
  console.log(cartarray)
  }, []);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item, index) => {
      totalPrice += item.finalPrice * (1-item.promos/100) * quantities[index];
    });
    return totalPrice;
  };

  const handleQuantityChange = (index, event) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(event.target.value, 10); 
    setQuantities(newQuantities);
    const cartarray = [];
  
      cart.forEach((product, index) => {
        cartarray.push({
          productoId: product.productoDTOID,
          amount: product.finalPrice * (1 - product.promos / 100),
          quantity: quantities[index]
        });
      });
    setCartDetail(cartarray)
    console.log(cartarray)
  };

  const handleOnPay =async (e)=>{
    e.preventDefault()
    axios.post("/api/carts/cartOnline",cartDetail, {
      headers: {
        Authorization: `Bearer ${token}`
    }
    }) .then((res) => {
      console.log(res.data)
      setPurchaseData({
        ...purchaseData,
        details: 'Detalle de compra',
        finalAmount: calculateTotalPrice(),
        cartId: res.data.cartID,
        paidMethod:["DEBITO"],
        taxes:[21],
        employeeId: 1

      });
    }).catch((err) => {
      console.log(err)
    swal({
      text: "Hubo un error con su compra.",
      icon: "error",
      button: "accept",
      timer: "2000"
  })
    });
    }

    useEffect(() => {
      console.log(purchaseData);
      axios.post("/api/sales/", purchaseData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log("OK");
        swal({
          text: "¡Muchas gracias por su compra!",
          icon: "success",
          button: "accept",
          timer: "2000"
      })
      })
      .catch((err) => {
        console.log(err);
      });
    }, [purchaseData]);
    


  return (
    <div className=''>
      <div className='flex justify-around items-center'>
        <div className='flex flex-col items-center p-10 gap-10'>
        <h2 className='text-2xl font-extrabold'>Shopping Cart:</h2>
        <div>
        <ul>
        {cart.map((item, index) => (
        <li key={index} className='flex justify-between items-center gap-10 border-r p-5 border-black'>
          <div>
            <img className="w-36" src={item.image} alt="" />
          </div>
          <div className='flex flex-col gap-3'>
          <div className='flex gap-5 justify-between'>
            <p className='font-bold'>
              Producto: 
            </p>
            {item.name}
          </div>
          <div className='flex gap-5 justify-between'>
            <p className='font-bold'>
              Precio:
            </p>
            {(item.finalPrice).toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}
          </div>
          <div className='flex gap-5 justify-between'>
            <p className='font-bold'>Descuento:</p>
            {(item.finalPrice * (item.promos/100)).toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}
          </div>
          <div className='flex gap-5 justify-between'>
            <p className='font-bold'>Cantidad:</p>
            <p className='opacity-60'>
            (Seleccione)
          </p>
            <input 
            
            className='text-right border border-black rounded-lg'
            type="number" 
            step="1" 
            min="1" 
            max={item.stock} 
            value={quantities[index]} 
            onChange={(event) => handleQuantityChange(index, event)}
          />
          
          </div>
          <div className='flex gap-5 justify-between'>
            <p className='font-bold'>
            Total: 
            </p>
            {(item.finalPrice * (1-item.promos/100) * quantities[index]).toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}
          </div>
          
          </div>
      <button className="bg-red-500 p-2 rounded-lg text-white hover:scale-95" onClick={() => removeFromCart(index)}>X Remove</button>
    </li>
  ))}
</ul>
        </div>
      </div>
        <div className='flex sticky top-[6.3rem] mb-5 flex-col rounded-lg justify-center gap-5 bg-gray-900 p-10 py-20 text-white '>
          <div className='flex gap-5 justify-between'>
            <p className='font-bold'>Sub Total:</p> 
            {(calculateTotalPrice()).toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}
          </div>
          <div className='flex gap-5 justify-between'>
            <p className='font-bold'>Envio:</p> 
            {shippingPrice.toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}
          </div>
          <div className='flex gap-5 justify-between'>
            <p className='font-bold'>Impuestos:</p>
            {(calculateTotalPrice()* 0.21).toLocaleString( 'en-US', { style:'currency', currency:'USD' } )} 
          </div>
          <div className='flex gap-5 justify-between'>
            <p className='font-bold'>Total:</p>
            {(calculateTotalPrice()* 0.21+ calculateTotalPrice()+shippingPrice).toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}
          </div>
          <div className='flex gap-5 justify-between'>
          <label className='font-bold'>Metodo de pago: </label>
          <select className='bg-gray-900'>
            <option value="DEBIT" selected>DEBIT</option>
            <option value= "CREDIT">CREDIT</option>
          </select>
        </div>
          <div>
           <button className='bg-green-600 w-[100%] rounded-lg font-bold hover:scale-95 ' onClick={handleOnPay} style={{ padding: '10px 20px', fontSize: '16px' }}>Pagar ahora</button>
          </div>
        </div>
        </div>
    </div>
  );
}

export default Cart;