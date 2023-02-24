import { FiArrowRight } from 'react-icons/fi';
import styles from './OrderButton.module.scss';

export const OrderButton = ({ onClick }) => {
	return (
		<button type='button' className={styles['orderButton']} onClick={onClick}>
			<div className={styles.title}>Оформить заказ</div>
			<div className={styles.arrow}>
				<FiArrowRight />
			</div>
		</button>
	);
};
