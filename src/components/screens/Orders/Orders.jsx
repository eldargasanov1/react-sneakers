import OrderItemContainer from '@/containers/OrderItemContainer';
import SearchInputContainer from '@/containers/SearchInputContainer';
import { Empty } from '@/components/Empty';
import styles from './Orders.module.scss';

export const Orders = ({ orderItems, isOrderItemsLoading, searchValue }) => {
	return (
		<div className={styles['orders']}>
			<div className={styles['title-wrapper']}>
				<div className={styles.title}>Заказы</div>
				<SearchInputContainer />
			</div>
			{orderItems.length ? (
				<div className={styles['order-list']}>
					{!isOrderItemsLoading &&
						orderItems
							.filter(item =>
								item.title.toLowerCase().includes(searchValue.toLowerCase())
							)
							.map(item => <OrderItemContainer key={item.id} {...item} />)}
				</div>
			) : (
				<div className={styles['empty-wrapper']}>
					<Empty
						imgUrl='src/assets/img/orders-emoji.png'
						title='У вас нет заказов'
						subtitle='Закажите что-нибудь!'
					/>
				</div>
			)}
		</div>
	);
};
