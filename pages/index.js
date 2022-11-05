import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import { useContext } from 'react';
import db from '../utils/db';
import { Store } from '../utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast('Sorry!! we are out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Product added successfully');
  };
  return (
    <Layout title={'Home_Page'}>
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap justify-start items-center gap-2  ">
          {products.map((product) => (
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
              key={product.slug}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
