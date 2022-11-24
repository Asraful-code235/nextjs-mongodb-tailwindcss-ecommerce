import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={'Create Account'}>
      <div className="grid place-items-center">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mx-auto  p-6 border shadow-sm rounded-md max-w-screen-md flex flex-col items-start justify-center"
        >
          <h1 className="mb-4 text-xl font-bold text-slate-500">
            Create Account
          </h1>
          <div className="mb-4 gap-4  w-full flex flex-col justify-between items-start">
            <label
              htmlFor="name"
              className="font-semibold text-slate-400 capitalize"
            >
              Name
            </label>
            <input
              {...register('name', {
                required: 'Please enter name',
              })}
              placeholder="Enter you'r Name "
              className="input input-bordered input-info w-full max-w-xs"
              type="text"
              id="name"
              autoFocus
            />
            {errors.name && (
              <div className="bg-red-100 w-full text-red-500 px-4 py-2 rounded-sm">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="mb-4 gap-4  w-full flex flex-col justify-between items-start">
            <label
              htmlFor="email"
              className="font-semibold text-slate-400 capitalize"
            >
              Email
            </label>
            <input
              {...register('email', {
                required: 'Please enter email',
                // pattern: {
                //   value: /^[a-zA-Z0-9_.+-]+@[a-zA-A0-9-]+.[a-aA-A0-9-.]+$/i,
                //   message: 'Enter valid email address',
                // },
              })}
              type="email"
              placeholder="Enter your email address"
              className="input flex  input-bordered input-info w-full max-w-xs"
              id="email"
            />
            {errors.email && (
              <div className="bg-red-100 w-full text-red-500 px-4 py-2 rounded-sm">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="mb-4 gap-4  w-full flex flex-col justify-between items-start">
            <label
              htmlFor="password"
              className="font-semibold text-slate-400 capitalize"
            >
              password
            </label>
            <input
              {...register('password', {
                required: 'Please enter password',
                minLength: {
                  value: 6,
                  message: 'password is more then 5 chars',
                },
              })}
              placeholder="Enter you'r password "
              className="input input-bordered input-info w-full max-w-xs"
              type="password"
              id="password"
              autoFocus
            />
            {errors.password && (
              <div className="bg-red-100 w-full text-red-500 px-4 py-2 rounded-sm">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="mb-4 gap-4  w-full flex flex-col justify-between items-start">
            <label
              htmlFor="confirmPassword"
              className="font-semibold text-slate-400 capitalize"
            >
              Confirm password
            </label>
            <input
              {...register('confirmPassword', {
                required: 'Please enter passworkd',
                validate: (value) => value === getValues('password'),
                minLength: {
                  value: 6,
                  message: 'password is more then 5 chars',
                },
              })}
              placeholder="Enter you'r password "
              className="input input-bordered input-info w-full max-w-xs"
              type="password"
              id="confirmPassword"
              autoFocus
            />
            {errors.confirmPassword && (
              <div className="bg-red-100 w-full text-red-500 px-4 py-2 rounded-sm">
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'validate' && (
                <div className="bg-red-100 w-full text-red-500 px-4 py-2 rounded-sm">
                  Password do not match
                </div>
              )}
          </div>
          <div className="mb-4">
            <button className="btn btn-warning px-6 text-slate-800">
              Register
            </button>
          </div>
          <div className="mb-4 text-slate-600">
            Don&apos;t have an account ?&nbsp;
            <Link
              href={`/register?redirect=${redirect || '/'}`}
              className="text-[#16849b] underline underline-offset-4"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
