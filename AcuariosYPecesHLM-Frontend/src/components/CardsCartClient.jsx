import React, { useEffect, useState } from "react";
import axios from "axios";
import numberFormatter from "../utils/currencyformatter";

function CardsCartClient({ cartDetails }) {
  const [product, setProduct] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`api/products/${cartDetails.productHolder}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {console.log(cartDetails)}
      {Object.keys(product).length > 0 ? (
        <tr className="border border-gray-200" key={cartDetails.cartDetailsID}>
          <td className="px-4 py-2 text-center">{product.name}</td>
          <td className="px-4 py-2 text-center">{cartDetails.quantity}</td>
          <td className="px-4 py-2 text-right">{numberFormatter.format(cartDetails.amount)}</td>
        </tr>
      ) : (
        <tr key={cartDetails.cartDetailsID}>
          <td className="px-4 py-2">{cartDetails.productHolder}</td>
          <td className="px-4 py-2 text-center">{cartDetails.quantity}</td>
          <td className="px-4 py-2 text-right">{numberFormatter.format(cartDetails.amount)}</td>
        </tr>
      )}
    </>
  );
}

export default CardsCartClient;
