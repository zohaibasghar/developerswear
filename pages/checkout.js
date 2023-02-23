import Link from "next/link";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {MdOutlinePayment} from 'react-icons/md'
import { BsViewList } from "react-icons/bs";
const Checkout = ({ cart, addtoCart, lessinCart, clearCart, subTotal }) => {
  return (
    <div className="bg-gray-900">
      <div className="container mx-auto py-5 ">
        <h2 className="text-center font-bold text-3xl">Checkout</h2>
        <h3 className="my-3 font-bold">1. Delivery Details</h3>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="user-name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-400 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="user-name"
              type="text"
              name="user-name"
              placeholder="Enter your name"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="user-email"
            >
              E-mail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="user-email"
              type="email"
              name="email"
              placeholder="@domain.com"
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-400 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="address"
              type="text"
              name="address"
              placeholder="Enter your Address"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="contact"
            >
              Phone
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-400 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="contact"
              type="text"
              name="contact"
              placeholder="Enter your contact #"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="state"
              type="text"
              name="state"
              placeholder="e.g. Punjab"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-400 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="city"
              type="text"
              name="city"
              placeholder="e.g. Lahore"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="postCode"
            >
              Postal Code
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="postCode"
              type="text"
              name="postCode"
              placeholder="Enteer your postal code"
            />
          </div>
        </div>
      </div>
      <div className="reviewCart">
        <section className="cart w-full text-gray-900 top-0 right-0 bg-yellow-500  px-8 py-10 ">
          <div className="wrapper">
            <div>
              <h3 className="my-3 font-bold">2. Review your cart & Pay</h3>

              <ol>
                {Object.keys(cart).length > 0 ? (
                  Object.keys(cart).map((item) => {
                    return (
                      <li
                        className="flex w-[250px] justify-between items-center my-8"
                        key={item}
                      >
                        <BsViewList />
                        <h3>{cart[item].name}</h3>
                        <div className="quan flex text-center items-center">
                          <AiOutlinePlus
                            className="cursor-pointer hover:bg-yellow-100"
                            onClick={() => {
                              addtoCart(item, 1, "XL", 699, "Tshirt", "Red");
                            }}
                          />
                          <span className="mx-1">{cart[item].qty}</span>
                          <AiOutlineMinus
                            className="cursor-pointer hover:bg-yellow-100"
                            onClick={() => {
                              lessinCart(item, 1);
                            }}
                          />
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <div className="text-center font-normal my-2">
                    Your cart is empty!
                  </div>
                )}
              </ol>
            </div>
            <div className="bill my-3">Total Bill: ${subTotal}</div>
            <div className="checkoutBtn flex flex-row">
              <Link
                href={"#"}
                className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                <span className="flex items-center">Pay now <MdOutlinePayment className="ml-2"/></span>
              </Link>

              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
