import { FiX } from 'react-icons/fi';
import styles from './CartItem.module.scss';

export const CartItem = ({ id, parentId, imageUrl, title, price, onClick }) => {
	return (
		<div className={styles['cartItem']}>
			<img
				src={imageUrl}
				alt='cartItem'
				className={styles['cartItem__image']}
			/>
			<div className={styles['cartItem__info']}>
				<div className={styles['cartItem__title']}>{title}</div>
				<div className={styles['cartItem__price']}>{price} руб.</div>
			</div>
			<button
				className={styles.removeBtn}
				onClick={() => onClick(id, parentId)}
			>
				<FiX />
			</button>
		</div>
	);
};
