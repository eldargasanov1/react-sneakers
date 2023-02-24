import { CardLoader } from '@/components/CardLoader';
import CardItemContainer from '@/containers/CardItemContainer';
import styles from './OrderItem.module.scss';

export const OrderItem = ({ title, orderedCartItems, isOrderItemsLoading }) => {
	return (
		<div className={styles['orderItem']}>
			<div className={styles.title}>{title}</div>
			<div className={styles['card-list']}>
				{isOrderItemsLoading
					? [...Array(3)].map((_, i) => <CardLoader key={i} />)
					: orderedCartItems.map(item => (
							<CardItemContainer key={item.id} inOrders={true} {...item} />
					  ))}
			</div>
		</div>
	);
};
