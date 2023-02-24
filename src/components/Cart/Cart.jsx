import { FiX } from 'react-icons/fi';
import { Empty } from '@/components/Empty';
import CartItemContainer from '@/containers/CartItemContainer';
import OrderButtonContainer from '@/containers/OrderButtonContainer';
import styles from './Cart.module.scss';

export const Cart = ({
	cartItems,
	isCartOpen,
	isOrdered,
	totalPrice,
	onClick,
}) => {
	return (
		<div className={`${styles.wrapper} ${isCartOpen ? styles.active : ''}`}>
			<div className={styles.cart}>
				<div className={styles['title-wrapper']}>
					<div className={styles.title}>Корзина</div>
					<button onClick={() => onClick(false)}>
						<FiX />
					</button>
				</div>
				{cartItems.length ? (
					<>
						<div className={styles.list}>
							{cartItems.map(item => (
								<CartItemContainer key={item.id} {...item} />
							))}
						</div>
						<div className={styles.info}>
							<div className='info-final'>
								<div className='info-final__title'>Итого:</div>
								<span></span>
								<div className={styles['info-final__price']}>
									{totalPrice.toFixed(2)} руб.
								</div>
							</div>
							<div className='info-tax'>
								<div className='info-tax__title'>Налог 5%:</div>
								<span></span>
								<div className={styles['info-tax__price']}>
									{(totalPrice * 0.05).toFixed(2)} руб.
								</div>
							</div>
						</div>
						<OrderButtonContainer />
					</>
				) : (
					<div className={styles['empty-wrapper']}>
						<Empty
							imgUrl={
								isOrdered
									? 'src/assets/img/cart/02.png'
									: 'src/assets/img/cart/01.png'
							}
							title={isOrdered ? 'Заказ оформлен!' : 'Корзина пустая'}
							subtitle={
								isOrdered
									? `Ваш заказ скоро будет передан курьерской доставке!`
									: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
							}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
