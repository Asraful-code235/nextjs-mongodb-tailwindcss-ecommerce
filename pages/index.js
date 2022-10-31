import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import data from '../utils/data';

export default function Home() {
  return (
    <Layout title={'Home_Page'}>
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap justify-start items-center gap-2  ">
          {data.product.map((product) => (
            <ProductItem product={product} key={product.slug} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
