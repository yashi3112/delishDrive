"use client";
import ProductCard from "./product-card";
import styles from "../styles/product.module.scss";
import { useState } from "react";
import { Product } from "@/models/product";

function ProductList() {
  const [productList, setProductList] = useState<Product[]>([]);
  const callAPI = async () => {
    try {
      const res = await fetch(`/products.json`);
      const data = await res.json();
      console.log("data", data);
      setProductList(data);
    } catch (err) {
      console.log(err);
    }
  };
  callAPI();
  return (
    <div className={styles["product-list"]}>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </div>
  );
}

export default ProductList;
