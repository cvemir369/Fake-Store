import ProductCard from "../components/ProductCard";
import Category from "../components/Category";
import Hero from "../components/Hero";

const Home = ({ allProducts, allCategories }) => {
  return (
    <main className="m-5">
      <Hero />
      <div role="tablist" className="tabs grid-cols-5 tabs-boxed">
        <a role="tab" className="tab tab-active">
          All Categories
        </a>
        {allCategories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Home;
