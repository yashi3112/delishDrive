"use client";
import styles from "../styles/cart.module.scss";
import productList from "../../products.json";
import { Button, Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faTrash,
  faPlusCircle,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/models/product";
import { useRouter } from "next/router";

function Cart() {
  const router = useRouter();
  const { addToCart, removeFromCart, removeEntireItem, cartItems } = useCart();

  const findProductById = (productId: number) => {
    return productList.find((item) => item.id === productId)!;
  };

  const totalCost = useMemo(() => {
    return cartItems.reduce((total, item) => {
      // Assuming each product has a price property
      const product = findProductById(item.productId);
      return total + item.quantity * (product?.price || 0);
    }, 0);
  }, [cartItems]);

  const handleCart = (product: Product) => {
    addToCart(product);
  };

  const handleRemoveCart = (product: Product) => {
    removeFromCart(product.id);
  };

  const deleteItem = (product: Product) => {
    removeEntireItem(product.id);
  };

  return (
    <div className={styles.cartItems}>
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Cart Items</Card.Title>
          <Card.Text>
            Review and manage the items in your cart before proceeding to
            checkout
          </Card.Text>
          <ListGroup className="list-group-flush">
            {cartItems.map((item) => {
              const product = findProductById(item.productId);
              return (
                <ListGroup.Item key={item.id}>
                  <div className={styles["item-details"]}>
                    <div className="image-container">
                      <img
                        src={product?.imagePath}
                        alt="Product"
                        width="50px"
                        height="50px"
                      />
                    </div>
                    <div className={styles["details-container"]}>
                      <div className={styles["product-details"]}>
                        <span className="product-name fw-normal">
                          {product?.title}
                        </span>
                        <span className="product-price fw-bold">
                          CA$ {product?.price}
                        </span>
                      </div>
                      <div className={styles["quantity-container"]}>
                        <FontAwesomeIcon
                          icon={faMinusCircle}
                          className={styles["color-red"]}
                          onClick={() => handleRemoveCart(product)}
                        />
                        <span className="quantity ms-2 fw-bold">
                          {item.quantity}
                        </span>

                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          className={styles["color-green"]}
                          onClick={() => handleCart(product)}
                        />
                      </div>
                    </div>
                    <div className="remove-container">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteItem(product)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>

          <div className={styles["action-btns"]}>
            <div className="left-section">
              <Button variant="dark" onClick={() => router.push("/")}>
                <FontAwesomeIcon icon={faArrowCircleLeft} className="me-2" />
                Continue Shopping
              </Button>
            </div>
            <div className="right-section">
              <Button variant="secondary" className="me-3">
                Total Cost: $ {totalCost.toFixed(2)}
              </Button>
              <Button
                variant="primary"
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cart;
