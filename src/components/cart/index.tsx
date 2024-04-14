import { useEffect, useRef, useState } from "react";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import styles from "./Cart.module.css";
import { cls } from "../../utils";
import { useOnClickOutside } from "../../hooks/use-onclick-outside";
import { useCart } from "../../contexts/CartContext";
import { Button } from "../button/Button";
import { MenuItem } from "../../api/menu";
import { CartItem } from "./CartItem";

type CartProps = {};

export function Cart(props: CartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [count, setCount] = useState(0);

  const flyoutRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside({
    ref: flyoutRef,
    handler: () => setIsOpen(false),
    captureClicks: false,
    clickCaptureIgnore: [triggerRef],
  });

  const { items: cartItems, submit, addItem, removeItem } = useCart();

  useEffect(() => {
    setItems(cartItems);
    const totalItem = cartItems.reduce(
      (acc, curr) => acc + (curr.quantity as number),
      0
    );
    setCount(totalItem);
  }, [cartItems]);

  const totalPrice = Math.ceil(
    cartItems.reduce(
      (acc, curr) => acc + (curr.quantity as number) * curr.price,
      0
    )
  );

  return (
    <div style={{ position: "relative" }}>
      <button
        className={styles.button}
        disabled={!count}
        onClick={() => setIsOpen((state) => !state)}
        ref={triggerRef}
      >
        <CartIcon />
        <p>{count}</p>
      </button>
      <div
        ref={flyoutRef}
        className={cls(styles.flyout, !isOpen && styles.closed)}
      >
        {count ? (
          items?.map((item, index) => (
            <CartItem
              key={item.description + index}
              item={item}
              addItem={addItem}
              removeItem={removeItem}
            />
          ))
        ) : (
          <p>Your order is empty</p>
        )}
        <Button className="full-width" onClick={() => submit()}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <span>
              Place Order
            </span>
            <span>${totalPrice} </span>
          </div>
        </Button>
      </div>
    </div>
  );
}
