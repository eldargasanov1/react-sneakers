import CartContainer from '@/containers/CartContainer';
import { Routing } from '@/components/Routing';
import styles from './Layout.module.scss';
import HeaderContainer from '@/containers/HeaderContainer';

export const Layout = () => {
	return (
		<div className={styles['layout']}>
			<HeaderContainer />
			<CartContainer />
			<main>
				<Routing />
			</main>
		</div>
	);
};
