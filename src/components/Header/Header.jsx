import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import styles from './Header.module.scss';

export const Header = ({ totalPrice, onClick }) => {
	return (
		<header className={styles['header']}>
			<Link to='/'>
				<div className={styles.logo}>
					<img src='img/logo.png' alt='' />
					<div className='logo__info'>
						<div className={styles['logo__title']}>REACT SNEAKERS</div>
						<div className={styles['logo__subtitle']}>
							Магазин лучших кроссовок
						</div>
					</div>
				</div>
			</Link>

			<div className={styles.menu}>
				<div className={styles.cart} onClick={() => onClick(true)}>
					<div className='cart__image'>
						<FiShoppingCart />
					</div>
					<div className={styles['cart__price']}>{totalPrice} руб.</div>
				</div>

				<Link to='/favorites'>
					<div className='favorite'>
						<FiHeart />
					</div>
				</Link>

				<Link to='/orders'>
					<div className='user'>
						<FiUser />
					</div>
				</Link>
			</div>
		</header>
	);
};
