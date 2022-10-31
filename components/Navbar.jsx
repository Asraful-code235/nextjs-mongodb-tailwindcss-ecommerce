import { Menu } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

const Navbar = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={'/'} className="btn btn-ghost normal-case text-xl">
            Ecommerce
          </Link>
        </div>
        <div className="flex-none">
          <Menu as={'div'} className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Menu.Button as="div" className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cart && (
                  <span className="badge badge-sm indicator-item">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Menu.Button>
            </label>
            <Menu.Items
              as={'div'}
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {
                    <span className="font-bold text-lg">
                      {cart &&
                        cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      Items
                    </span>
                  }
                </span>
                <span className="text-info">Subtotal: $999</span>
                <Menu.Item as={'div'} className="card-actions">
                  <Link href={'/cart'}>
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
          <Menu as="div" className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <Menu.Button
                as="div"
                className="w-10 rounded-full hover:bg-gray-300
              "
              >
                <Image
                  src="https://placeimg.com/80/80/people"
                  alt="profile"
                  fill
                  className="rounded-full p-2 "
                />
              </Menu.Button>
            </label>
            <Menu.Items>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Menu.Item>
                  {({ active }) => (
                    <li>
                      <a
                        className={`justify-between ${
                          active ? 'bg-gray-200' : ''
                        }`}
                      >
                        Profile
                        {/* <span className="badge">New</span> */}
                      </a>
                    </li>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <li className={`${active ? 'bg-gray-200' : ''}`}>
                      <a>Settings</a>
                    </li>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <li className={`${active ? 'bg-gray-200' : ''}`}>
                      <a>Logout</a>
                    </li>
                  )}
                </Menu.Item>
              </ul>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Navbar;
