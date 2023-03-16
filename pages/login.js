import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setLoginCred({ ...loginCred, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      router.push("/");
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true)
    let res = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCred),
    });
    let data = await res.json();
    setLoading(false)
    if (data.result) {
      localStorage.setItem("auth-token", data.token);
      setLoginCred({ email: "", password: "" });
      toast.success(`Happy Shopping ❤`);
      router.push("/");
    } else {
      toast.error("Login failed! kindly enter valid credentials");
    }
  };

  return (
    <div>
      <Head>
        <title>Login | Developer Wear</title>
        <meta
          name="description"
          content="the most affordable accessories for programmers and developer and coders"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
            <h2 className="text-white text-3xl font-medium title-font mb-5">
              Login
            </h2>
            <small>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Don't have an account? &nbsp;
              <Link
                href={"/signup"}
                className="text-yellow-500 underline text-lg hover:text-yellow-700"
              >
                Signup
              </Link>
            </small>
            <form method="POST" onSubmit={login}>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-400"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={loginCred.email}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="@domain.com"
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-400"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  value={loginCred.password}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <button className="text-white font-bold bg-yellow-500 border-0 my-3 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                {loading?`Loading...`:`Login`}
              </button>
            </form>
            <Link
              href={"/forgot"}
              className="my-2 text-right text-gray-300 hover:text-yellow-500 underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
