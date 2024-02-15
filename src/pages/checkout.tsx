"use client";
import React, { useMemo, useState } from "react";
import { useCart } from "@/hooks/useCart";
import productList from "../../products.json";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import styles from "../styles/checkout.module.scss";

// CheckoutPage component
const CheckoutPage = () => {
  const { cartItems, emptyCart } = useCart();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const validateFormFields = (event: any) => {
    /* eslint-disable  no-explicit-any */
    const { name, value } = event.target;
    if (!value) {
      errors[name as keyof typeof errors] = "required";
    } else {
      errors[name as keyof typeof errors] = "";
    }

    setErrors((prevState) => {
      return {
        ...prevState,
        [name]: errors[name as keyof typeof errors],
      };
    });
    /* eslint-enable  no-explicit-any */
  };

  const {
    firstName: firstNameError,
    lastName: lastNameError,
    email: emailError,
    address: addressError,
  } = errors;

  const findProductById = (productId: number) => {
    return productList.find((item) => item.id === productId)!;
  };

  const showSuccessMessage = () => {
    toast.success("Order placed successfully", {
      position: "top-right",
    });
    setTimeout(() => {
      router.push("/");
      emptyCart();
    }, 1000);
  };

  const totalCost = useMemo(() => {
    return cartItems.reduce((total, item) => {
      // Assuming each product has a price property
      const product = findProductById(item.productId);
      return total + item.quantity * (product?.price || 0);
    }, 0);
  }, [cartItems]);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Checkout</h1>

      <Row>
        <Col md={6}>
          <h2>Your Cart</h2>
          {/* Display items in the cart */}
          <ul className="list-group">
            {cartItems.map((item) => {
              const product = findProductById(item.productId);
              return (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <span className="item-name">{product.title}</span>
                    <Badge bg="secondary" className="ms-2">
                      {item.quantity}
                    </Badge>
                  </div>
                  <div>
                    <Badge bg="primary"> ${product.price}</Badge>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="total-price mt-3">
            <strong>Total: ${totalCost}</strong>
          </div>
        </Col>

        <Col md={6}>
          <h2>Customer Information</h2>

          <form>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    onBlur={validateFormFields}
                    name="firstName"
                  />
                  <span className={styles["error-text"]}>
                    {firstNameError ? `First Name is ${firstNameError}` : ""}
                  </span>
                </div>
                <div className="col">
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    onBlur={validateFormFields}
                    name="lastName"
                  />
                  <span className={styles["error-text"]}>
                    {lastNameError ? `Last Name is ${lastNameError}` : ""}
                  </span>
                </div>
              </div>
              {/* <label>Email address</label> */}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                onBlur={validateFormFields}
                name="email"
              />
              <span className={styles["error-text"]}>
                {emailError ? `Email is ${emailError}` : ""}
              </span>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>

            <div className="form-group">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery Address"
                onBlur={validateFormFields}
                name="address"
              />
              <span className={styles["error-text"]}>
                {addressError ? `Address is ${addressError}` : ""}
              </span>
            </div>
          </form>
          <Button
            variant="primary"
            className="mt-3"
            onClick={showSuccessMessage}
            disabled={
              !!(firstNameError || lastNameError || emailError || addressError)
            }
          >
            Place Order
          </Button>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
