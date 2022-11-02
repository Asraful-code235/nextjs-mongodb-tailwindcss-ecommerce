import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
// import data from '../utils/data';
import db from '../utils/db';

export default function Home({ products }) {
  return (
    <Layout title={'Home_Page'}>
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap justify-start items-center gap-2  ">
          {products.map((product) => (
            <ProductItem product={product} key={product.slug} />
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
