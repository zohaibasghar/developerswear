import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  let unique = [];

  console.log(unique);
  useEffect(() => {
    const getOrder = async () => {
      let req = await fetch("/api/myorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("auth-token") }),
      });
      const res = await req.json();
      setOrders(res.orders);
    };
    if (!localStorage.getItem("auth-token")) {
      router.push("/");
    } else {
      getOrder();
    }
  }, [router]);
  return (
    <div className="container mx-auto min-h-screen">
      <h1 className="text-center text-2xl font-semibold m-6">My Orders</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3">
                Payment status
              </th>
              <th scope="col" className="px-6 py-3">
                Bill
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              let setArr = [];
              setArr.push(order);
              if (unique.includes(order.orderId)) {
                return;
              } else {
                unique.push(order.orderId);
                return (
                  <tr
                    key={order.orderId}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      // scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.orderId}
                    </th>
                    <td className="px-6 py-4">{order.paymentInfo}</td>
                    <td className="px-6 py-4">{order.status}</td>
                    <td className="px-6 py-4">$ {order.amount}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
