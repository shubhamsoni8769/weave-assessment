import { MenuItem } from "../../api/menu";
import styles from "./CartItem.module.css";
import { ReactComponent as TrashIcon } from "../../assets/trash.svg";

type CartItemProps = {
  item: MenuItem;
  addItem: Function;
  removeItem:Function
};

export function CartItem({ item, addItem, removeItem }: CartItemProps) {
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
        <div className={styles.price}>${Math.ceil(item.price * (item.quantity || 1))}</div>
      </div>
      <div>
        <div className={styles.cartButton}>
          <button onClick={() => removeItem(item)}>{(item.quantity as number) >1 ? "-" : <TrashIcon/> }</button>
          <span>{item.quantity}</span>
          <button onClick={() => addItem(item)}>+</button>
        </div>
      </div>
    </div>
  );
}
