import { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserContext";
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch("http://localhost:3001/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id }),
        });
        const data = await res.json();
        console.log(`data`, data);

        setOrders(data);
        console.log(orders);
      } catch (err) {
        console.error(err);
      }
    }

    fetchOrder();
  }, [user, setOrders]);
  localStorage.setItem("orders", JSON.stringify(orders));

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
