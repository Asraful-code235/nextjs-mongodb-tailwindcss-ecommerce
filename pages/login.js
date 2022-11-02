import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
// import { info } from 'daisyui/src/colors/colorNames';
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const router = useRouter();
  const { redirect } = router.query;
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
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
    <Layout title={'Login'}>
      <div className="grid place-items-center">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mx-auto  p-6 border shadow-sm rounded-md max-w-screen-md flex flex-col items-start justify-center"
        >
          <h1 className="mb-4 text-xl font-bold text-slate-500">Login</h1>
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
              autoFocus
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
                required: 'Please enter passworkd',
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
          <div className="mb-4">
            <button className="btn btn-warning px-6 text-slate-800">
              Login
            </button>
          </div>
          <div className="mb-4 text-slate-600">
            Don&apos;t have an account ?&nbsp;
            <Link
              href={'register'}
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
