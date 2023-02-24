import CardItemContainer from '@/containers/CardItemContainer';
import { CardLoader } from '@/components/CardLoader';
import SearchInputContainer from '@/containers/SearchInputContainer';
import styles from './Favorites.module.scss';
import { Empty } from '@/components/Empty';

export const Favorites = ({
	favoriteItems,
	isFavoriteItemsLoading,
	searchValue,
}) => {
	return (
		<div className={styles['favorites']}>
			<div className={styles['title-wrapper']}>
				<div className={styles.title}>Избранное</div>
				<SearchInputContainer />
			</div>
			{favoriteItems.length ? (
				<div className={styles['card-list']}>
					{isFavoriteItemsLoading
						? [...Array(10)].map((_, i) => <CardLoader key={i} />)
						: favoriteItems
								.filter(item =>
									item.title.toLowerCase().includes(searchValue.toLowerCase())
								)
								.map(item => (
									<CardItemContainer
										key={item.id}
										parentId={item.parentId}
										{...item}
									/>
								))}
				</div>
			) : (
				<div className={styles['empty-wrapper']}>
					<Empty
						imgUrl='src/assets/img/favorite-emoji.png'
						title='Закладок нет :('
						subtitle='Вы ничего не добавляли в закладки'
					/>
				</div>
			)}
		</div>
	);
};
