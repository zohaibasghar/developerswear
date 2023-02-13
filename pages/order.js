import Image from "next/image";
function Order() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Order # 5234243532 placed Successfully!
            </h2>
            <h1 className="text-white text-3xl title-font font-medium mb-4">
              Order # 5234243532
            </h1>
            <div className="flex mb-4">
              <a className="flex-grow border-b-2 border-gray-800 py-2 text-lg px-1">
                Item
              </a>
              <a className="flex-grow border-b-2 border-gray-800 py-2 text-lg px-1 text-right">
                Quantity
              </a>
              <a className="flex-grow border-b-2 border-gray-800 py-2 text-lg px-1 text-right">
                Sub Total
              </a>
            </div>

            <div className="flex  py-2">
              <span className="text-gray-500">TShirt</span>
              <span className="ml-auto text-white">1</span>
              <span className="ml-auto text-white">$30</span>
            </div>
            <div className="flex border-t border-gray-800 py-2">
              <span className="text-gray-500">Stickers</span>
              <span className="ml-auto text-white">5</span>
              <span className="ml-auto text-white">$15</span>
            </div>

            <div className="flex border-t  mb-6 border-gray-800 py-2">
              <span className="text-gray-500">Mugs</span>
              <span className="ml-auto text-white">4</span>
              <span className="ml-auto text-white">$13</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-white">
                Total: $58.00
              </span>
              <button className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">
                Track Order
              </button>
            </div>
          </div>
          <Image
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://ih1.redbubble.net/image.830561167.2848/ssrco,classic_tee,womens,101010:01c5ca27c6,front_alt,square_product,600x600.u1.jpg"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}

export default Order;
