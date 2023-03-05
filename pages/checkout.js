import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { BsViewList } from "react-icons/bs";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/bank.module.css";
import { toast } from "react-toastify";
const Checkout = ({ cart, addtoCart, lessinCart, subTotal, clearCart }) => {
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [token, setToken] = useState("");
  const [bank, setBank] = useState("");
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
    paymentInfo: "",
  });

  const [pinCodes, setPinCodes] = useState({});
  let emailFetch = async (token) => {
    let fet = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    let data = await fet.json();
    const newstate = {
      ...checkOutCred,
      name: data.name,
      email: data.email,
    };
    setCheckOutCred(newstate);
  };
  useEffect(() => {
    setToken(localStorage.getItem("auth-token"));
    emailFetch(token);
    setCheckOutCred((prevState) => ({
      ...prevState,
      amount: subTotal,
    }));
    console.log(checkOutCred.amount);
    console.log(subTotal);
    async function pinReq() {
      let pinReq = await fetch("/api/pincode", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let pincodes = await pinReq.json();

      setPinCodes(pincodes);
    }
    pinReq();
  },[subTotal,cart.qty]);

  const credChange = async (e) => {
    const { name, value } = e.target;
    let newState = { ...checkOutCred, [name]: value };

    if (name === "pinCode" && value.length === 6) {
      const [city, state] = pinCodes[value] || [];
      newState = { ...newState, city: city || "", state: state || "" };
    } else if (name === "pinCode") {
      newState = { ...newState, city: "", state: "" };
    }

    setCheckOutCred(newState);
  };

  const bankChange = async (e) => {
    if (e.target.tagName === "SPAN") {
      setCheckOutCred({
        ...checkOutCred,
        paymentInfo: e.target.textContent,
      });
      setBank(e.target.textContent);
    }
  };
  const payNow = async (e) => {
    e.preventDefault();
    setIsOpen(false);
    const res = await fetch("/api/pretransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkOutCred),
    });
    const jsonData = await res.json();

    if (jsonData.success === true) {
      // router.push(`/order?id=${checkOutCred.orderId}`);
      // clearCart();
      toast.success("Order placed successfully!");
      let postTrx = await fetch("/api/posttransaction", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: checkOutCred.orderId }),
      });
    } else if (jsonData.success === false) {
      toast.error(jsonData.error);
      // clearCart()
    }
  };
  const banks = [
    {
      bank: "b1",
      bname: "UBL",
    },
    {
      bank: "b2",
      bname: "Meezan Bank",
    },
    {
      bank: "b3",
      bname: "JazzCash",
    },
    {
      bank: "b4",
      bname: "EasyPaisa",
    },
    {
      bank: "b5",
      bname: "Standard Chartered",
    },
    {
      bank: "b6",
      bname: "Bank Alfalah",
    },
    {
      bank: "b7",
      bname: "SadaPay",
    },
  ];

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
              readOnly={token}
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
              readOnly={token}
              placeholder="ali@domain.com"
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
              placeholder="Enter your postal code"
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
        </div>
      </div>
      <div className="reviewCart">
        <section className="cart w-full text-gray-900 top-0 right-0 bg-yellow-500  px-8 py-10 ">
          <div className="wrapper">
            <div>
              <h3 className="my-3 font-bold">2. Review your cart & Pay</h3>

              <div>
                {Object.keys(cart).length > 0 ? (
                  Object.keys(cart).map((item) => {
                    return (
                      <span
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
                          <li className="mx-1 list-none">{cart[item].qty}</li>
                          <AiOutlineMinus
                            className="cursor-pointer hover:bg-yellow-100"
                            onClick={() => {
                              lessinCart(item, 1);
                            }}
                          />
                        </div>
                      </span>
                    );
                  })
                ) : (
                  <div className="text-center font-normal my-2">
                    Your cart is empty!
                  </div>
                )}
              </div>
            </div>
            <div className="bill my-3">Total Bill: ${subTotal}</div>

            <button
              onClick={() => {
                setIsOpen(true);
              }}
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded checkoutBtn flex flex-row disabled:bg-gray-100 disabled:text-gray-800"
              disabled={
                Object.keys(cart).length == 0
                // checkOutCred.name.length < 3 ||
                // checkOutCred.email.length < 3 ||
                // checkOutCred.address.length < 3 ||
                // checkOutCred.phone.length < 5 ||
                // checkOutCred.state.length < 2 ||
                // checkOutCred.city.length < 2 ||
                // checkOutCred.pinCode.length < 2
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
          <Dialog.Panel className="w-full max-w-md rounded bg-gray-800 p-4">
            <Dialog.Title className="font-semibold text-xl py-1">
              Payment Info
            </Dialog.Title>
            <hr />
            <Dialog.Description className={`py-1`}>
              Select your desired payment gateway!
            </Dialog.Description>

            <div
              className="py-1 bankList flex justify-around gap-1 my-2"
              onClick={bankChange}
            >
              {banks.map((b) => {
                return (
                  <span
                    key={b.bank}
                    className={`${styles.bank} rounded text-transparent`}
                    id={b.bank}
                  >
                    {b.bname}
                  </span>
                );
              })}
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
                onClick={() => {
                  setIsOpen(false);
                  setBank(null);
                }}
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
