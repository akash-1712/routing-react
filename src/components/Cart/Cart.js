import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const orderVisibleHandler = () => {
    setIsVisible(true);
  };
  const orderHiddenHandler = () => {
    setIsVisible(false);
  };
  const orderButton = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderVisibleHandler}>
          Order
        </button>
      )}
    </div>
  );
  const submitOrderHandler = (userData) => {
    fetch("https://newreactmeal-default-rtdb.firebaseio.com/order.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        items: cartCtx.items,
      }),
    });
    console.log(userData);
  };
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isVisible && (
        <CheckOut
          onConform={submitOrderHandler}
          onClick={orderHiddenHandler}
        ></CheckOut>
      )}
      {!isVisible && orderButton}
    </Modal>
  );
};

export default Cart;
