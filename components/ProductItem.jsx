// import Image from 'next/image';
// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="flex shadow-md flex-col   items-center overflow-hidden">
      <div className="card card-compact w-64 h-auto bg-base-100 shadow-xl">
        <figure>
          <Link href={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              // alt="Shoes"
              className="rounded shadow-sm  h-52 "
            />
          </Link>
        </figure>
        <div className="card-body">
          <Link href={`/product/${product.slug}`}>
            <h2 className="card-title">{product.name}</h2>
          </Link>
          <p className="">{product.brand}</p>
          <p>${product.price}</p>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
