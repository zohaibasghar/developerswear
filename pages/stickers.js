import Product from "@/models/Product";
import Image from "next/image";
import mongoose from "mongoose";
import Link from "next/link";

const Tshirts = ({ products }) => {
  return (
    products && (
      <div>
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-2 py-10 mx-auto">
            <div className="flex flex-wrap -m-4 gap-2 justify-center">
              {Object.keys(products).map((item) => {
                return (
                  <Link
                    passHref={true}
                    href={`/product/${products[item].slug}`}
                    key={products[item]._id}
                    className="lg:w-1/5 md:w-1/3 p-4 bg-gray-600 bg-opacity-20"
                  >
                    <div className="block relative h-48 rounded overflow-hidden">
                      <Image
                        width={600}
                        height={600}
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={products[item].img}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products[item].category}
                      </h3>
                      <h2 className="text-white title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <div className="mt-1">${products[item].price}</div>
                      {products[item].size != null &&
                        products[item].size.map((s) => {
                          return (
                            <span
                              key={s}
                              className="mt-1 border border-gray-500 p-0.5 mr-1"
                            >
                              {s}
                            </span>
                          );
                        })}
                      <br />
                      {products[item].color.includes("red") && (
                        <button
                          className={`border-2 border-red-700 m-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}
                        ></button>
                      )}
                      {products[item].color.includes("blue") && (
                        <button
                          className={`border-2 border-blue-700 m-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none`}
                        ></button>
                      )}
                      {products[item].color.includes("yellow") && (
                        <button
                          className={`border-2 border-yellow-700 m-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none`}
                        ></button>
                      )}
                      {products[item].color.includes("black") && (
                        <button
                          className={`border-2 border-black m-1 bg-black rounded-full w-6 h-6 focus:outline-none`}
                        ></button>
                      )}
                      {products[item].color.includes("purple") && (
                        <button
                          className={`border-2 border-purple-700 m-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none`}
                        ></button>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    )
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
  }
  let products = await Product.find({ category: ["sticker", "Sticker"] });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}
export default Tshirts;
