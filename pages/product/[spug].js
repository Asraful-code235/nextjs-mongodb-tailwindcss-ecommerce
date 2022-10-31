import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

export default function ProductScreen() {
  const query = useRouter();
  const slug = query.query['spug'];
  const product = data.product.find((x) => x.slug === slug);
  if (!product) {
    return <div>Not found</div>;
  }

  return (
    <Layout title={product.name}>
      <div className="container">
        <div className="py-2">
          <Link className="text-slate-600  hover:text-slate-800" href={'/'}>
            back to product
          </Link>
        </div>
        <div className="flex items-start justify-center sm:items-start md:items-start lg:items-start  md:justify-between lg:justify-between gap-4 flex-wrap">
          <div className=" flex-1 items-center sm:items-start md:items-start lg:items-start flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center sm:justify-start md:justify-start lg:justify-start  gap-4 border rounded-sm ">
            <Image
              src={product.image}
              alt={product.name}
              width={330}
              height={330}
              layout="responsive "
            />
            <div className=" w-full items-start p-6 sm:p-0 md:p-0 lg:p-0">
              <ul className="list-none p-4">
                <li className="my-4">
                  <h1
                    className="text-2xl text-slate-800
                "
                  >
                    {product.name}
                  </h1>
                </li>
                <li className="my-1">
                  <p className="text-[#16849b] font-light capitalize text-start ">
                    Category:<span className="ml-4">{product.category}</span>
                  </p>
                </li>
                <li className="my-1">
                  <p className="text-[#16849b] font-light capitalize ">
                    Brand:<span className="ml-4">{product.brand}</span>
                  </p>
                </li>
                <li className="my-1">
                  <p className="text-orange-400 font-light capitalize ">
                    {product.rating} of {product.numReviews} Rating
                  </p>
                </li>
                <li className="mt-4 flex flex-col items-start justify-start">
                  <p className="text-slate-800 font-semibold  capitalize ">
                    Description:
                  </p>
                  <p className="text-slate-500">{product.description}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="shadow-md items-center justify-center  h-min w-80">
            <div className="card h-min p-5">
              <div className="mb-2 flex justify-between">
                <div className="text-slate-500">Price</div>
                <div className="font-semibold">${product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div className="text-slate-500">Status</div>
                <div
                  className={`font-semibold ${
                    product.countInStock > 0
                      ? 'text-orange-400'
                      : 'text-red-500'
                  }`}
                >
                  {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                </div>
              </div>
              {product.countInStock > 0 ? (
                <button className="btn btn-success w-full text-white">
                  Add to cart
                </button>
              ) : (
                <button className="btn btn-error w-full">Add to cart</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
