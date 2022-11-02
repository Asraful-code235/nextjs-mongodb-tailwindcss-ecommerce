import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckOutWizard from '../components/CheckOutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress.address]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push('/payment');
  };
  return (
    <Layout title={'Shipping Address'}>
      <CheckOutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl text-slate-600 font-bold">
          Shipping Address
        </h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="input  input-bordered input-info w-full "
            id="fullName"
            autoFocus
            {...register('fullName', { required: 'Please enter full name' })}
            type="text"
          />
          {errors.fullName && (
            <div className="bg-red-100 w-full text-red-500 px-4 py-2 rounded-sm">
              {errors.fullName.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="input  input-bordered input-info w-full "
            id="address"
            type="text"
            autoFocus
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 3, message: 'Address is more then 2 chars' },
            })}
          />
          {errors.address && (
            <div className="bg-red-100 w-full text-red-500 px-4 py-2 rounded-sm">
              {errors.address.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className="input  input-bordered input-info w-full "
            id="city"
            type="text"
            autoFocus
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && (
            <div className="bg-red-100 w-full text-red-500 px-4 py-2 rounded-sm">
              {errors.city.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="input  input-bordered input-info w-full "
            id="postalCode"
            type="text"
            autoFocus
            {...register('postalCode', {
              required: 'Please enter postal code',
            })}
          />
          {errors.postalCode && (
            <div className="bg-red-100 w-full text-red-500 px-4 py-2 rounded-sm">
              {errors.postalCode.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            className="input  input-bordered input-info w-full "
            id="country"
            type="text"
            autoFocus
            {...register('country', {
              required: 'Please enter country',
            })}
          />
          {errors.country && (
            <div className="bg-red-100 w-full text-red-500 px-4 py-2 rounded-sm">
              {errors.country.message}
            </div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="btn btn-primary">Next</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
