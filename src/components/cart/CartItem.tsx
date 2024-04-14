import { MenuItem } from "../../api/menu";
import styles from "./CartItem.module.css";

type CartItemProps = {
  item: MenuItem;
  addItem: Function
};

export function CartItem({ item, addItem }: CartItemProps) {
  return (
    <div className={styles.item}>
        {item.imgUrl ? (
          <img
            src={item.imgUrl}
            alt={item.description}
            className={styles.image}
          />
        ) : (
          <div />
        )}
      <div className={styles.cartDescription}>
        <label className={styles.title}>{item.name}</label>
        <div className={styles.description}>{item.description}</div>
        <div className={styles.price}>${item.price}</div>
      </div>
      <div>
        <div className={styles.cartButton}>
          <button >-</button>
          <span>{item.quantity}</span>
          <button onClick={() => addItem(item)}>+</button>
        </div>
      </div>
    </div>
  );
}
