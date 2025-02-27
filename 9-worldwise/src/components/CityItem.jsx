import styles from './CityItem.module.css';

const formatDate = (date) =>
    new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));
export default function CityItem({ city }) {
    const { emoji, cityName, date } = city;
    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>
                <img
                    src={emoji}
                    alt='❌'
                    width='30'
                />
            </span>

            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    );
}
