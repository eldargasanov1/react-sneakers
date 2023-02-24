import { FiHeart, FiPlus, FiCheck } from 'react-icons/fi';
import styles from './CardItem.module.scss';

export const CardItem = ({
	id,
	parentId,
	imageUrl,
	title,
	price,
	inCart,
	inFavorites,
	inOrders,
	addToFavorites,
	addToCart,
}) => {
	const obj = { id, parentId, imageUrl, title, price };

	return (
		<div className={styles['cardItem']}>
			<div className={styles.image}>
				{!inOrders && (
					<button
						className={`${styles['image__heart']} ${
							inFavorites ? styles.active : ''
						}`}
						onClick={() => addToFavorites(obj, inFavorites)}
					>
						<FiHeart />
					</button>
				)}
				<img src={imageUrl} alt='card-img' />
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.price}>
				<div className={styles['price__info']}>
					<div className={styles['price__title']}>Цена:</div>
					<div className={styles['price__value']}>{price} руб.</div>
				</div>
				{!inOrders && (
					<button
						className={`${styles.plus} ${inCart ? styles.active : ''}`}
						onClick={() => addToCart(obj, inCart)}
					>
						{inCart ? <FiCheck /> : <FiPlus />}
					</button>
				)}
			</div>
		</div>
	);
};
