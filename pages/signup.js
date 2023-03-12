import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Signup = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      router.push("/");
    }
  }, []);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await res.json();
    if (data.result === "success") {
      setUser({ name: "", email: "", password: "" });
      router.push("/");
      toast.success(`${user.name}!  Welcome on board. Now login! `);
    } else {
      toast.error(`Kindly enter valid credentials!`);
    }
  };
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-white text-3xl font-medium title-font">
            Sign up
          </h2>
          <small className="my-1">
            already have an account? &nbsp;
            <Link
              href={"/login"}
              className="text-yellow-500 underline text-lg hover:text-yellow-700"
            >
              Login
            </Link>
          </small>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-400">
                Full Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="name"
                name="name"
                value={user.name}
                placeholder="John Wick"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                value={user.email}
                placeholder="johnwick1@domain.com"
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
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                value={user.password}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button className="text-white font-bold bg-yellow-500 border-0 my-3 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
