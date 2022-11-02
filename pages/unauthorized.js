import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title={'Unauthorized page'}>
      <div className="grid place-items-center p-4">
        <h1 className="text-xl text-slate-800 font-bold">Access Denied</h1>
        {message && (
          <div className="mb-4 bg-red-300 text-red-500 w-full">{message}</div>
        )}
      </div>
    </Layout>
  );
}
