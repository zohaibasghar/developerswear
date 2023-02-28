/* eslint-disable @next/next/no-img-element */
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { BsViewList } from "react-icons/bs";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/bank.module.css";

const Checkout = ({ cart, addtoCart, lessinCart, subTotal }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [bank, setBank] = useState(null);
  const [checkOutCred, setCheckOutCred] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    state: "",
    city: "",
    pinCode: "",
    cart: cart,
    amount: subTotal,
    orderId: JSON.stringify(Date.now()),
    paymentInfo:''
  });
  console.log(checkOutCred.paymentInfo)
  const credChange = (e) => {
    setCheckOutCred({ ...checkOutCred, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  
  const payNow = async (e) => {
    e.preventDefault();
    setCheckOutCred({
      ...checkOutCred,
      orderId: JSON.stringify(Date.now()),
      paymentInfo:bank
    });
    const res = await fetch("/api/pretransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkOutCred),
    });
    const jsonData = await res.json();
    console.log(jsonData);
    // setCheckOutSuccess(true)
    if (jsonData.success === true) {
      // router.push("/order");
    }
  };

  return (
    <div className="bg-gray-900">
      <div className="container mx-auto py-5 ">
        <h2 className="text-center font-bold text-3xl">Checkout</h2>
        <h3 className="my-3 font-bold">1. Delivery Details</h3>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              onChange={credChange}
              value={checkOutCred.name}
              name="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              name="email"
              onChange={credChange}
              value={checkOutCred.email}
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
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="address"
              type="text"
              name="address"
              onChange={credChange}
              value={checkOutCred.address}
              placeholder="Enter your Address"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="phone"
              type="text"
              name="phone"
              onChange={credChange}
              value={checkOutCred.phone}
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
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="state"
              type="text"
              onChange={credChange}
              name="state"
              value={checkOutCred.state}
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
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="city"
              type="text"
              name="city"
              placeholder="e.g. Lahore"
              onChange={credChange}
              value={checkOutCred.city}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="pinCode"
            >
              Postal Code
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="pinCode"
              type="text"
              name="pinCode"
              onChange={credChange}
              value={checkOutCred.pinCode}
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

            <button
              onClick={() => setIsOpen(true)}
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded checkoutBtn flex flex-row disabled:bg-gray-100 disabled:text-gray-800"
              disabled={
                Object.keys(cart).length == 0 ||
                checkOutCred.name.length < 3 ||
                checkOutCred.email.length < 3 ||
                checkOutCred.address.length < 3 ||
                checkOutCred.phone.length < 5 ||
                checkOutCred.state.length < 2 ||
                checkOutCred.city.length < 2 ||
                checkOutCred.pinCode.length < 2
              }
            >
              <span className="flex items-center">
                Pay now <MdOutlinePayment className="ml-2" />
              </span>
            </button>
          </div>
        </section>
      </div>

      {/* Payment modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-gray-800 p-4">
            <Dialog.Title className="font-semibold text-xl py-1">
              Payment Info
            </Dialog.Title>
            <hr />
            <Dialog.Description className={`py-1`}>
              Select your desired payment gateway!
            </Dialog.Description>

            <div className="py-1 bankList flex justify-around my-2">
              <span
                onClick={() => {
                  setBank("UBL");
                }}
                className={`${styles.bank} rounded mr-1`}
                id="b1"
              ></span>
              <span
                onClick={() => {
                  setBank("Meezan Bank");
                }}
                className={`${styles.bank} rounded mr-1`}
                id="b2"
              ></span>
              <span
                onClick={() => {
                  setBank("Jazzcash");
                }}
                className={`${styles.bank} rounded mr-1`}
                id="b3"
              ></span>
              <span
                onClick={() => {
                  setBank("Easypaisa");
                }}
                className={`${styles.bank} rounded mr-1`}
                id="b4"
              ></span>
              <span
                onClick={() => {
                  setBank("Standard Chartered Bank");
                }}
                className={`${styles.bank} rounded mr-1`}
                id="b5"
              ></span>
              <span
                onClick={() => {
                  setBank("Bank Alfalah");
                }}
                className={`${styles.bank} rounded mr-1`}
                id="b6"
              ></span>
              <span
                onClick={() => {
                  setBank("SadaPay");
                }}
                className={`${styles.bank} rounded mr-1`}
                id="b7"
              ></span>
            </div>
            {bank && <div>Selected Bank : {bank}</div>}

            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                disabled={!bank}
                onClick={payNow}
                className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded checkoutBtn flex flex-row disabled:bg-gray-100 border border-gray-900 disabled:text-gray-800"
              >
                Confirm
              </button>
              <button
                onClick={() => {setIsOpen(false);setBank(null)}}
                className="bg-transparent hover:bg-gray-900 font-semibold text-white py-2 px-4 border border-white hover:border-transparent rounded"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Checkout;
