import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import dynamic from 'next/dynamic';
import axios from 'axios';

import { toast } from 'react-toastify';
// import { TiDeleteOutline } from 'react-icons/ti';

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const price = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry .product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated successfully');
  };
  return (
    <Layout title={'Shopping cart'}>
      <h1 className="mb-4 text-xl font-semibold border-b">Shoping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.{' '}
          <Link href={'/'} className="text-[#16849b] font-semibold">
            Go shopping
          </Link>
        </div>
      ) : (
        <div> </div>
      )}
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">Item</th>
                <th className="p-5 text-right">Quantity</th>
                <th className="p-5 text-right">Price</th>
                <th className="p-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.slug} className="border-b">
                  <td>
                    <Link href={`/product/${item.slug}`}>
                      <p className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={35}
                          height={35}
                          className="rounded-full  m-5"
                        />
                        &nbsp;
                        {item.name}
                      </p>
                    </Link>
                  </td>
                  <td className="p-5 text-right">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateCartHandler(item, e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-5 text-right">${item.price}</td>
                  <td className="p-5 text-center">
                    <button
                      onClick={() => removeItemHandler(item)}
                      className="btn btn-circle btn-ghost"
                    >
                      &#x2716;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card w-62 bg-base-100 h-min shadow-xl">
          <div className="card-body">
            <h2 className="card-title border-b text-slate-800">Subtotal </h2>
            <p className="text-slate-600">
              Quantity({cartItems.reduce((a, c) => a + c.quantity, 0)}):$
              {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
            </p>
            <div className="card-actions justify-end">
              {price > 0 ? (
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="btn btn-primary"
                >
                  Check Out
                </button>
              ) : (
                <button
                  onClick={() => router.push('/')}
                  className="btn btn-error"
                  disabled
                >
                  Lets buy some items
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
