import { Menu } from '@headlessui/react';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
// import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';

const Navbar = () => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    return () => {
      setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    };
  }, [cart.cartItems]);

  const logOutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
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
              <Link href={'/carts'}>
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
                      {cartItemsCount}
                    </span>
                  )}
                </Menu.Button>
              </Link>
            </label>
          </Menu>
          <Menu as="div" className="dropdown dropdown-end">
            {status === 'loading' ? (
              '...'
            ) : session?.user ? (
              <div>
                <label tabIndex={0} className="btn btn-ghost btn-circle ">
                  <Menu.Button
                    as="div"
                    className="rounded-full w-auto text-xl   hover:bg-gray-300 capitalize grid place-items-center
              "
                  >
                    {session.user.name.charAt(0)}

                    {/* <Image
                  src="https://placeimg.com/80/80/people"
                  alt="profile"
                  fill
                  className="rounded-full p-2 "
                /> */}
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
                          <Link
                            href={'/profile'}
                            className={`justify-between ${
                              active ? 'bg-gray-200' : ''
                            }`}
                          >
                            Profile
                            {/* <span className="badge">New</span> */}
                          </Link>
                        </li>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <li className={`${active ? 'bg-gray-200' : ''}`}>
                          <Link href={'/order-history'}>Order History</Link>
                        </li>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <li className={`${active ? 'bg-gray-200  ' : ''}`}>
                          <Link onClick={logOutClickHandler} href={'#'}>
                            Logout
                          </Link>
                        </li>
                      )}
                    </Menu.Item>
                  </ul>
                </Menu.Items>
              </div>
            ) : (
              <Link href={'/login'}>
                <p className="px-6 mx-2 btn btn-square btn-ghost">Login</p>
              </Link>
            )}
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Navbar;
