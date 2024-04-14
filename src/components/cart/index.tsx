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

  const { items: cartItems, submit, addItem } = useCart();

  useEffect(() => {
    setItems(cartItems);
    setCount(cartItems.length);
  }, [cartItems]);

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
            <CartItem key={item.description + index} item={item} addItem={addItem} />
          ))
        ) : (
          <p>Your order is empty</p>
        )}
        <Button className="full-width" onClick={() => submit()}>Place Order</Button>
      </div>
    </div>
  );
}
