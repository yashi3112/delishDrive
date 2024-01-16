import styles from "../styles/home.module.scss";
import ProductCard from "./product-card";
import ProductList from "./product-list";

function Home() {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className={styles["home-title"]}>Menu</h2>
      </div>
      <div className="d-flex justify-content-between p-5">
        <ProductList></ProductList>
      </div>
    </div>
  );
}

export default Home;
