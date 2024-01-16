"use client";
import productList from "../../products.json";
import ProductCard from "./product-card";
import styles from "../styles/product.module.scss"

function ProductList() {
  return (
    <div className={styles['product-list']}>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </div>
  );
}

export default ProductList;
