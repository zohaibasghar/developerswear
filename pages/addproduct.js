import Head from "next/head";
import { Fragment, useState } from "react";

const AddProduct = () => {
  const [productCred, setProductCred] = useState({
    title: "",
    slug: "",
    desc: "",
    img: "",
    category: "",
    size: "",
    color: "",
    price: "",
    availableQty: "",
  });
  const credChange = (e) => {
    const { name, value } = e.target;
    setProductCred({ ...productCred, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let req = await fetch("/api/addproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([productCred]),
    });
    let res = await req.json();
    console.log(res);
  };

  return (
    <Fragment>
      <Head>
        <title>Add product to database | Developer Wear</title>
        <meta
          name="description"
          content="the most affordable accessories for programmers and developer and coders"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center m-4">Add Product</h2>
      <form action="POST" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="title"
              type="text"
              onChange={credChange}
              name="title"
              value={productCred.title}
              placeholder="Product Title"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="slug"
            >
              Slug
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="slug"
              type="text"
              onChange={credChange}
              name="slug"
              value={productCred.slug}
              placeholder="Product slug"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="desc"
            >
              Description
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="desc"
              type="text"
              onChange={credChange}
              name="desc"
              value={productCred.desc}
              placeholder="Product desc"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="img"
            >
              image Link
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="img"
              type="text"
              onChange={credChange}
              name="img"
              value={productCred.img}
              placeholder="Product img"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="category"
              type="text"
              onChange={credChange}
              name="category"
              value={productCred.category}
              placeholder="Product category"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="size"
            >
              Size
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="size"
              type="text"
              onChange={credChange}
              name="size"
              value={productCred.size}
              placeholder="Product size"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="color"
            >
              Color
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="color"
              type="text"
              onChange={credChange}
              name="color"
              value={productCred.color}
              placeholder="Product color"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="price"
              type="text"
              onChange={credChange}
              name="price"
              value={productCred.price}
              placeholder="Product price"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="availableQty"
            >
              Available Quantity
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="availableQty"
              type="text"
              onChange={credChange}
              name="availableQty"
              value={productCred.availableQty}
              placeholder="Product availableQty"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn rounded bg-yellow-500 hover:bg-transparent border border-yellow-500 px-6 py-1 text-xl mb-2 mx-auto text-gray-900 hover:text-white hover:font-thin"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
    </Fragment>
  );
};

export default AddProduct;
