import React from "react";

function CardSales({sale}) {
    return (
        <div className="border-y-2 bg-gray-900 bg-opacity-70 borderflex flex-col gap-2 min-w-[25rem] p-5 min-h-[11rem] max-w-[20rem] text-white">
            <div>Monto Final: {sale.finalAmount.toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}</div>
            <div>Método de pago: {sale.paidMethod}</div>
            <div>Impuestos: {sale.taxes.length > 0 ? sale.taxes.map(taxe => <p>{taxe.toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}</p>) : <h1>No hay impuestos</h1>}</div>
            <div>Carrito id: {sale.cartHolder}</div>
        </div>
    )
}

export default CardSales