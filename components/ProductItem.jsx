// import Image from 'next/image';
// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <>
      <div className="flex  flex-col border  shadow-none hover:shadow-md   items-center overflow-hidden">
        <div className="card card-compact  w-[256px] h-auto bg-base-100  ">
          <figure>
            <Link href={`/product/${product.slug}`}>
              <img
                src={product.image}
                alt={product.name}
                // alt="Shoes"
                className="rounded shadow-sm  h-[24rem] bg-cover "
              />
            </Link>
          </figure>
          <div className="card-body">
            <Link href={`/product/${product.slug}`}>
              <h2 className="card-title">{product.name}</h2>
            </Link>
            <Link
              href={`/product/${product.slug}`}
              className="text-slate-500 gap-1"
            >
              <p className="">{product.brand}</p>
            </Link>
            <Link href={`/product/${product.slug}`}>
              <p>${product.price}</p>
            </Link>

            <div className="card-actions justify-start">
              <button
                className="btn btn-primary px-4"
                onClick={() => addToCartHandler(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
