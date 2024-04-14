import { MenuItem } from "../../api/menu";
import styles from "./CartItem.module.css";

type CartItemProps = {
  item: MenuItem;
};

export function CartItem({ item }: CartItemProps) {
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
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
      </div>
    </div>
  );
}
