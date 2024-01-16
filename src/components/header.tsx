"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/header.module.scss";
import { useCart } from "@/hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

function Header() {
  const { cartItems } = useCart();
  const router = useRouter();

  return (
    <Navbar expand="lg" className={styles["navbar-bg"]}>
      <Container>
        <Navbar.Brand href="#home" className={styles["navbar-link"]}>
          Delish Drive
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`me-auto ${styles["checkout-nav"]}`}>
            <Nav.Item
              onClick={() => router.push("/cart")}
              className={styles["navbar-link"]}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span className={styles.cart}>{cartItems.length}</span>
            </Nav.Item>
            {/* <Nav.Link href="#link" className={styles["navbar-link"]}>
              My Account
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
