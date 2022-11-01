// import Image from 'next/image';
// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <>
      <Link
        href={`/product/${product.slug}`}
        className="flex  flex-col border  shadow-none hover:shadow-md   items-center overflow-hidden"
      >
        <div className="card card-compact  w-[250px] h-[410px] bg-base-100  ">
          <figure>
            <div>
              <img
                src={product.image}
                alt={product.name}
                // alt="Shoes"
                className="rounded shadow-sm  h-52 "
              />
            </div>
          </figure>
          <div className="card-body">
            <div>
              <h2 className="card-title">{product.name}</h2>
            </div>
            <p className="">{product.brand}</p>
            <p>${product.price}</p>

            {/* <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductItem;
