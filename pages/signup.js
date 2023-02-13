import Link from "next/link";
const Signup = () => {
    return (
        <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
            <h2 className="text-white text-3xl font-medium title-font">
              Sign up
            </h2>
            <small className="my-1">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            already have an account? &nbsp;
              <Link href={'/login'} className="text-yellow-500 underline text-lg hover:text-yellow-700">Login</Link>
            </small>
            <div className="relative mb-4">
              <label htmlFor="fname" className="leading-7 text-sm text-gray-400">
                Full Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Your name"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
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
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-400">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button className="text-white font-bold bg-yellow-500 border-0 my-3 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              Sign up
            </button>
            
          </div>
        </div>
      </section>
    );
}

export default Signup;