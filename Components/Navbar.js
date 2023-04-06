import { useContext, useEffect, useRef, useState } from "react";
import logo from "public/logo-no-background.svg";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiOutlineCloseCircle,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import {
  MdAccountCircle,
  MdIncompleteCircle,
  MdShoppingCart,
} from "react-icons/md";
import { toast } from "react-toastify";
import { UserContext } from "@/Context/UserContext";

function MobileNav({ open, setOpen }) {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-gray-900 transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center justify-center filter drop-shadow-md py-3 bg-gray-800 ">
        {/*logo container*/}
        <Link className="text-xl font-semibold" href="/">
          <Image src={logo} width={200} height={100} alt="Developer's Wear" />
        </Link>
      </div>
      <div className="flex flex-col ml-4">
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit font-normal my-4"
          href="/"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Home
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit font-normal my-4"
          href="/tshirts"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Tshirts
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit font-normal my-4"
          href="/mugs"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Mugs
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit font-normal my-4"
          href="/stickers"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Stickers
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit font-normal my-4"
          href="/hoodies"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Hoodies
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit font-normal my-4"
          href="/contact"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Contact
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit font-normal my-4"
          href="/about"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          About
        </Link>
      </div>
    </div>
  );
}

export default function Navbar({
  cart,
  addtoCart,
  lessinCart,
  clearCart,
  subTotal,
}) {
  const ref = useRef();
  const [dropDown, setDropDown] = useState(false);
  const { user, logout } = useContext(UserContext);
  const closeCart = () => {
    ref.current.classList.add("translate-x-full");
  };
  const openCart = () => {
    ref.current.classList.remove("translate-x-full");
  };

  const [open, setOpen] = useState(false);

  return (
    <nav className="flex filter drop-shadow-md bg-gray-800 px-4 py-1  items-center">
      <MobileNav open={open} setOpen={setOpen} />
      <div className="w-3/12 flex items-center">
        <Link className="text-2xl font-semibold py-2" href="/">
          <Image src={logo} width={200} height={100} alt="Developer's Wear" />
        </Link>
      </div>
      <div className="hidden md:flex flex-row">
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit  m-4 font-normal my-4"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit mr-4 font-normal my-4"
          href="/tshirts"
        >
          Tshirts
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit mr-4 font-normal my-4"
          href="/mugs"
        >
          Mugs
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit mr-4 font-normal my-4"
          href="/stickers"
        >
          Stickers
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit mr-4 font-normal my-4"
          href="/hoodies"
        >
          Hoodies
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit mr-4 font-normal my-4"
          href="/contact"
        >
          Contact
        </Link>
        <Link
          className="text-xl hover:border-b hover:border-yellow-500 w-fit font-normal my-4"
          href="/about"
        >
          About
        </Link>
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <div
          className="z-5 cursor-pointer flex relative w-8 h-7 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-3.5" : ""
            }`}
          />
          <span
            className={`h-1 w-full bg-white rounded-lg transition-all duration-300 ease-in-out ${
              open ? "w-0" : "w-full"
            }`}
          />
          <span
            className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </div>

        <div className=" md:flex justify-end">
          {user.token && (
            <Link
              href={""}
              className="absolute md:right-16 sm:right-28 text-3xl sm:top-0 md:top-3 mr-3 m-1 cursor-pointer rounded hover:bg-yellow-500 hover:text-blue-900 p-1"
              onMouseEnter={() => {
                setDropDown(true);
              }}
              onMouseLeave={() => {
                setDropDown(false);
              }}
            >
              <MdAccountCircle />
            </Link>
          )}
          {!user.token && (
            <Link
              href={"/login"}
              className="absolute text-md md:right-16 sm:right-36  hover:text-blue-700   hover:bg-yellow-700 px-2 py-1 rounded bg-yellow-500 sm:top-1 md:top-5"
            >
              Login
            </Link>
          )}

          {dropDown === true && user.token && (
            <ul
              className="absolute sm:right-28 md:right-20 md:top-8 sm:top-5 py-2 px-2 bg-yellow-500 rounded w-32"
              onMouseEnter={() => {
                setDropDown(true);
              }}
              onMouseLeave={() => {
                setDropDown(false);
              }}
            >
              <Link href={"/myaccount"}>
                <li className="text-sm font-bold hover:text-gray-800 py-1 cursor-pointer">
                  My Account
                </li>
              </Link>
              <Link href={"/orders"}>
                <li className="text-sm font-bold hover:text-gray-800 py-1 cursor-pointer">
                  Orders
                </li>
              </Link>
              <Link
                onClick={() => {
                  logout();
                  setDropDown(false);
                }}
                href={""}
              >
                <li className="text-sm font-bold hover:text-gray-800 py-1 cursor-pointer">
                  logout
                </li>
              </Link>
            </ul>
          )}

          <Link
            href={"#"}
            onClick={openCart}
            className="absolute md:right-0 sm:right-12 flex md:top-4 sm:-top-3 mr-5  hover:bg-yellow-500 rounded"
          >
            <div className="block mt-4 lg:inline-block hover:text-gray-700 lg:mt-0 align-middle text-white text-xl p-1">
              <MdShoppingCart className="text-3xl " />
              {Object.keys(cart).length > 0 && (
                <span className="absolute right-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                  {Object.keys(cart).length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      <section
        ref={ref}
        className="cart z-10 absolute h-screen shadow-2xl text-gray-900 top-0 right-0 bg-yellow-500 w-[300px] px-8 py-10 transform  transition-transform translate-x-full"
      >
        <div className="wrapper">
          <div
            className="closeBtn absolute top-5 right-5 cursor-pointer hover:bg-yellow-200 p-1"
            onClick={closeCart}
          >
            <AiOutlineCloseCircle className="text-2xl" />
          </div>
          <div>
            <h2 className="text-center text-2xl font-bold my-3 ">
              Shopping Cart
            </h2>
            <div className="bill my-3 text-right">Total Bill: ${subTotal}</div>
            <ol>
              {Object.keys(cart).length > 0 ? (
                Object.keys(cart).map((item) => {
                  return (
                    <li
                      className="flex w-[250px] justify-between items-center my-3 border-b p-1 border-gray-500"
                      key={item}
                    >
                      <div className="flex flex-col items-center">
                        <h3>{cart[item].name}</h3>
                        <span>
                          {cart[item].variant}/{cart[item].size}
                        </span>
                      </div>
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
          <div className="checkoutBtn flex justify-between">
            <Link href={"/checkout"} onClick={closeCart}>
              <button
                className="bg-gray-900 disabled:bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                disabled={Object.keys(cart).length == 0}
              >
                Check Out
              </button>
            </Link>
            <button
              className="bg-transparent disabled:border-0 disabled:text-white disabled:bg-gray-400 hover:bg-gray-900 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded"
              onClick={() => {
                toast.info(`Cart cleared!`);
                clearCart();
              }}
              disabled={Object.keys(cart).length == 0}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
}
