import styles from './SearchInput.module.scss';

export const SearchInput = ({ searchValue, onChange }) => {
	return (
		<input
			type='text'
			className={styles['searchInput']}
			placeholder={'Введите запрос...'}
			value={searchValue}
			onChange={e => onChange(e.target.value)}
		/>
	);
};
