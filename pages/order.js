import mongoose from "mongoose";
import Order from "@/models/Order";
import Image from "next/image";
import Product from "@/models/Product";
import Head from "next/head";

function OrderPage({ order, orderProduct }) {
  const products = order.products;
  
  return (
    <>
      <Head>
        <title>{`Order Confirmed! ${orderProduct.title}`}</title>
      </Head>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Order # {order.orderId} placed Successfully!
              </h2>
              <h1 className="text-white text-3xl title-font font-medium mb-4">
                {orderProduct.title}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow border-b-2 border-gray-800 py-2 text-lg px-1">
                  Item
                </a>
                <a className="flex-grow border-b-2 border-gray-800 py-2 text-lg px-1 text-right">
                  Quantity
                </a>
                <a className="flex-grow border-b-2 border-gray-800 py-2 text-lg px-1 text-right">
                  Sub Total
                </a>
              </div>

              {Object.keys(products).map((item) => {
                return (
                  <div key={item} className="flex pb-2 mb-5">
                    <span className="text-white">
                      {item}
                      {` (${products[item].size})`}
                    </span>
                    <span className="m-auto text-white">
                      {products[item].qty}
                    </span>
                    <span className="ml-auto text-white">
                      $ {products[item].price}
                    </span>
                  </div>
                );
              })}

              <div className="flex">
                <span className="title-font font-medium text-2xl text-white">
                  Total: $ {order.amount}
                </span>
                <button className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">
                  Track Order
                </button>
              </div>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {order.status == "Paid"
                  ? `Paid via ${order.paymentInfo}`
                  : "Payment Pending"}
              </h2>
              <div className="flex flex-col py-2">
                <div className="flex flex-row">
                  <span>Email:</span>
                  <span className="text-white">&nbsp;{order.email}</span>
                </div>
                <div className="flex flex-row">
                  <span>Address:</span>
                  <span className="text-white">&nbsp;{order.address}</span>
                </div>
                <div className="flex flex-row">
                  <span>Products:</span>
                  <span className="text-white">
                    &nbsp;{Object.keys(order.products)}
                  </span>
                </div>
              </div>
            </div>

            <Image
              alt={orderProduct.title}
              className="lg:w-1/2 w-full lg:h-[60vh] min-h-[300px] h-64 object-cover object-center rounded"
              src={orderProduct.img}
              width={600}
              height={600}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
  }

  let order = await Order.findOne({ orderId: context.query.id });

  let orderProduct = await Product.findOne({
    slug: Object.keys(order.products)[0],
  });
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      orderProduct: JSON.parse(JSON.stringify(orderProduct)),
    },
  };
}

export default OrderPage;
