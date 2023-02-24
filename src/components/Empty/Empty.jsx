import styles from './Empty.module.scss';
import BackButtonContainer from '@/containers/BackButtonContainer';

export const Empty = ({ imgUrl, title, subtitle }) => {
	return (
		<div className={styles['empty']}>
			<img src={imgUrl} alt='emptyImg' className={styles.img} />
			<div className={styles.title}>{title}</div>
			<p className={styles.subtitle}>{subtitle}</p>
			<BackButtonContainer />
		</div>
	);
};
