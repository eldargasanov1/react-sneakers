import SearchInputContainer from '@/containers/SearchInputContainer';
import { CardLoader } from '@/components/CardLoader';
import CardItemContainer from '@/containers/CardItemContainer';
import styles from './Home.module.scss';

export const Home = ({ mainItems, isMainItemsLoading, searchValue }) => {
	return (
		<div className={styles['home']}>
			<div className={styles['title-wrapper']}>
				<div className={styles.title}>Все кроссовки</div>
				<SearchInputContainer />
			</div>
			<div className={styles['card-list']}>
				{isMainItemsLoading
					? [...Array(10)].map((_, i) => <CardLoader key={i} />)
					: mainItems
							.filter(item =>
								item.title.toLowerCase().includes(searchValue.toLowerCase())
							)
							.map(item => (
								<CardItemContainer key={item.id} parentId={item.id} {...item} />
							))}
			</div>
		</div>
	);
};
