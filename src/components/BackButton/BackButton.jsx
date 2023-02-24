import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './BackButton.module.scss';

export const BackButton = ({ isCartOpen, onClick }) => {
	return (
		<Link to='/'>
			<button
				type='button'
				className={styles['backButton']}
				onClick={isCartOpen ? () => onClick(false) : null}
			>
				<div className={styles.arrow}>
					<FiArrowLeft />
				</div>
				<div className={styles.title}>Вернуться назад</div>
			</button>
		</Link>
	);
};
