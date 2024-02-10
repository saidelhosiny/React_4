import axios from "axios";
import { createContext, useState } from "react";

export let shantaContext = createContext(0);
export default function ContextStore({ children }) {
  const [token, setToken] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [cartCount, setCartCount] = useState(null);

  let headers = {
    token: localStorage.getItem("token"),
  };

  async function addToCart(productId) {
    try {
      let { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      );

      setCartCount(data.numOfCartItems);
      return data;
    } catch (error) {
      
    }
  }
  async function removeCart(productId) {
    try {
      const { data } = await axios.delete(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      );

      setCartCount(data.numOfCartItems);
      return data;
    } catch (error) {
      
    }
  }

  async function getLoggedUserCart() {
    try {
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        {
          headers,
        }
      );
      setCartId(data?.data._id);
      setCartCount(data.numOfCartItems);
      return data;
    } catch (error) {
      
    }
  }
  // async function getCartId() {
  //   let data = await getLoggedUserCart();
  //   setCartId(data?.data.data._id);

  // }
  // useEffect(() => {
  //   // getCartId();

  // }, []);

  function updateCartCount(productId, count) {
    return axios
      .put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function onlinePayment(productId, url, values) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${productId}?url=${url}`,
        {
          shippingAddress: values,
        },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <shantaContext.Provider
      value={{
        token,
        setToken,
        addToCart,
        getLoggedUserCart,
        removeCart,
        updateCartCount,
        onlinePayment,
        cartId,
        cartCount,
      }}
    >
      {children}
    </shantaContext.Provider>
  );
}
