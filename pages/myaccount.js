import { UserContext } from "@/Context/UserContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const MyAccount = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const router = useRouter();
  const [passCred, setPassCred] = useState({
    oPass: "",
    nPass: "",
    cPass: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      router.push("/");
    }

  }, []);

  const userCredChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const userUpdate = async (e) => {
    e.preventDefault();
    let req = await fetch("/api/updateuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        email:userInfo.email,
        address: userInfo.address,
        pinCode: userInfo.pinCode,
        phone: userInfo.phone,
      }),
    });
    let res = await req.json();
    if (res.success === true) {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
      toast.success("Successfully updated!");
    } else {
      toast.error("Error updating!");
    }
  };
  const passCredChange = (e) => {
    setPassCred({
      ...passCred,
      [e.target.name]: e.target.value,
    });
  };
  const passUpdate = async (e) => {
    e.preventDefault();
    if (passCred.nPass === passCred.cPass) {
      let passReq = await fetch("/api/passwordupdate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passCred, email }),
      });
      let passRes = await passReq.json();
      if (passRes.success === true) {
        toast.success("Password Successfully updated!");
        setPassCred({
          ...passCred,
          cPass: "",
          nPass: "",
          oPass: "",
        });
      } else {
        toast.error(passRes.error);
      }
    } else {
      toast.error("Passwods does not match!");
    }
  };
  return (
    <Fragment>
      <Head>
        <title>Account Details | Developer Wear</title>
        <meta
          name="description"
          content="the most affordable accessories for programmers and developer and coders"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container  mx-auto">
        <h2 className="text-center font-bold text-2xl my-2">
          Update your account info.
        </h2>
        <form action="POST" onSubmit={userUpdate}>
          <h3 className="font-bold text-xl mb-1">1. Delivery Details</h3>
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
                name="name"
                placeholder="User name"
                onChange={userCredChange}
                value={userInfo.name}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="text"
                readOnly={true}
                name="email"
                placeholder="User email"
                onChange={userCredChange}
                value={userInfo.email}
              />
            </div>
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="address"
                type="text"
                name="address"
                placeholder="User address"
                onChange={userCredChange}
                value={userInfo.address}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="phone"
              >
                Contact
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="phone"
                type="text"
                name="phone"
                placeholder="User phone"
                onChange={userCredChange}
                value={userInfo.phone}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="pinCode"
              >
                Pincode
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="pinCode"
                type="text"
                name="pinCode"
                placeholder="User pinCode"
                onChange={userCredChange}
                value={userInfo.pinCode}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn rounded bg-yellow-500 hover:bg-transparent border border-yellow-500 px-6 py-1 text-xl mb-5 mx-auto text-gray-900 hover:text-white hover:font-thin"
            >
              Update
            </button>
          </div>
        </form>
        <form action="POST" onSubmit={passUpdate}>
          <h3 className="font-bold text-xl mb-2">2. Change your password</h3>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="oPass"
              >
                Old Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="oPass"
                type="password"
                name="oPass"
                placeholder="Enter your old password"
                onChange={passCredChange}
                value={passCred.oPass}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="nPass"
              >
                New Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nPass"
                type="password"
                name="nPass"
                placeholder="Enter New password"
                onChange={passCredChange}
                value={passCred.nPass}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
                htmlFor="cPass"
              >
                Confirm Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="cPass"
                type="password"
                name="cPass"
                placeholder="Confirm your New password"
                onChange={passCredChange}
                value={passCred.cPass}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn rounded bg-yellow-500 hover:bg-transparent border border-yellow-500 px-6 py-1 text-xl mb-5 mx-auto text-gray-900 hover:text-white hover:font-thin"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default MyAccount;
