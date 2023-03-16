import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [passState, setPassState] = useState("email");
  const [passCred, setPassCred] = useState({ pass: "", cPass: "" });
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      router.push("/");
    }
  }, []);
  let passCredChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "otp") {
      setOtp(e.target.value);
    }
    if (e.target.name === "pass") {
      setPassCred({ ...passCred, pass: e.target.value });
    }
    if (e.target.name === "cPass") {
      setPassCred({ ...passCred, cPass: e.target.value });
    }
  };
  const emailValidation = async (e) => {
    e.preventDefault();
    setLoading(true);
    let req = await fetch("/api/forgot/emailvalidation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    let res = await req.json();
    if (res.success === true) {
      setPassState("otp");
      toast.info(res.msg);
    } else {
      toast.error(res.msg);
    }
  };
  const otpValidation = async (e) => {
    e.preventDefault();
    setLoading(true);
    let req = await fetch("/api/forgot/otpvalidation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });
    setLoading(false);
    let res = await req.json();
    if (res.success === true) {
      setPassState("passReset");
      toast.info(res.msg);
    } else {
      toast.error(res.msg);
    }
  };
  const passReset = async (e) => {
    e.preventDefault();
    console.log(passCred);
    setLoading(true);
    let req = await fetch("/api/forgot/passreset", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, passCred }),
    });
    setLoading(false);
    let res = await req.json();
    if (res.success === true) {
      setPassState("passReset");
      toast.success(res.msg);
      router.push("/");
    } else {
      toast.error(res.error);
    }
  };
  return (
    <Fragment>
      <Head>
        <title>Forgot Password | Developer Wear</title>
        <meta
          name="description"
          content="the most affordable accessories for programmers and developer and coders"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full md:min-h-[100vh] min-h-screen bg-gray-900 justify-center items-center">
        <div className=" bg-gray-800 bg-opacity-50 md:m-5 rounded-lg p-8 flex flex-col mt-10 ">
          <h2 className="text-white text-center text-3xl font-medium title-font mb-5">
            Forgot Password
          </h2>
          {passState === "email" && (
            <>
              <form onSubmit={emailValidation} className="relative w-96 mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  onChange={passCredChange}
                  id="email"
                  value={email}
                  name="email"
                  placeholder="@domain.com"
                  className=" w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <button
                  type="submit"
                  className="text-white font-bold bg-yellow-500 border-0 my-3 py-2 px-8 focus:outline-none w-full hover:bg-yellow-600 rounded text-lg"
                >
                  {loading ? <div>Loading...</div> : <div>Continue</div>}
                </button>
              </form>
            </>
          )}
          {passState === "otp" && (
            <>
              <form onSubmit={otpValidation} className="relative w-96 mb-4">
                <label
                  htmlFor="otp"
                  className="leading-7 text-sm text-gray-400"
                >
                  OTP
                </label>
                <input
                  type="text"
                  onChange={passCredChange}
                  id="otp"
                  value={otp}
                  name="otp"
                  placeholder="xxxxxx"
                  className=" w-full text-center mb-2 bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <small className="block mb-3">
                  You have received an OTP on your E-mail. <br /> OTP will be
                  expired in 2 hours.
                </small>
                <button
                  type="submit"
                  className="text-white font-bold bg-yellow-500 border-0 my-3 py-2 px-8 focus:outline-none w-full hover:bg-yellow-600 rounded text-lg"
                >
                  {loading ? <div>Loading...</div> : <div>Confirm OTP</div>}
                </button>
              </form>
            </>
          )}
          {passState === "passReset" && (
            <>
              <form onSubmit={passReset} className="relative w-96 mb-4">
                <label
                  htmlFor="pass"
                  className="leading-7 text-sm text-gray-400"
                >
                  New Passowrd
                </label>
                <input
                  type="password"
                  onChange={passCredChange}
                  id="pass"
                  value={passCred.pass}
                  name="pass"
                  placeholder="Enter new password"
                  className=" w-full text-center mb-3 bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <label
                  htmlFor="cPass"
                  className="leading-7 text-sm text-gray-400"
                >
                  Confirm Passowrd
                </label>
                <input
                  type="password"
                  onChange={passCredChange}
                  id="cPass"
                  value={passCred.cPass}
                  name="cPass"
                  placeholder="Enter new password"
                  className=" w-full text-center mb-3 bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <button
                  type="submit"
                  className="text-white font-bold bg-yellow-500 border-0 my-3 py-2 px-8 focus:outline-none w-full hover:bg-yellow-600 rounded text-lg"
                >
                  {loading ? <div>Loading...</div> : <div>Reset Password</div>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Forgot;
