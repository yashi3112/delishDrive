"use client";
import Card from "react-bootstrap/Card";
import { Product } from "@/models/product";
import styles from "../styles/product.module.scss";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function ProductCard({ product }: { product: Product }) {
  const { addToCart, cartItems, removeFromCart } = useCart();
  const [isRemoveButtonDisabled, setRemoveButtonDisabled] = useState(true);

  const handleCart = () => {
    // Create a copy of the existing cart items and add the new product
    addToCart(product);
    setRemoveButtonDisabled(findQuantity(product) === 0);
  };

  const handleRemoveCart = () => {
    removeFromCart(product.id);
    setRemoveButtonDisabled(findQuantity(product) === 0);
  };

  const findQuantity = (product: Product) => {
    return cartItems.find((item) => item.productId === product.id)?.quantity;
  };

  if (!product) {
    // Handle the case where product is undefined or null
    return <div>No product data available</div>;
  }

  return (
    <Card style={{ width: "25rem" }}>
      <Card.Img
        variant="top"
        src={product.imagePath}
        className={styles["card-img"]}
      />
      <Card.Body className={styles["product-card"]}>
        <Card.Title className={styles["card-title"]}>
          {product.title}
        </Card.Title>
        <Card.Text className={styles["card-desc"]}>
          {product.description}
        </Card.Text>
        <Card.Text className={styles["price-text"]}>${product.price}</Card.Text>
        <div className={styles["button-container"]}>
          <button
            className="button remove-button me-2"
            onClick={handleRemoveCart}
            disabled={isRemoveButtonDisabled}
          >
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
          <span className={styles.quantity}>{findQuantity(product) || 0}</span>
          <button className="button add-button ms-2" onClick={handleCart}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
