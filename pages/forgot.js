import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

const Forgot = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      router.push("/");
    }
  }, []);
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
      <div className="flex w-full h-[90vh] bg-gray-900 justify-center items-center">
        <div className=" bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col  mt-10 md:mt-0">
          <h2 className="text-white text-center text-3xl font-medium title-font mb-5">
            Forgot Password
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="@domain.com"
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="text-white font-bold bg-yellow-500 border-0 my-3 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
            Continue
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Forgot;
