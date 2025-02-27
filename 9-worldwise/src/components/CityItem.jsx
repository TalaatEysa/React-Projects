import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';

const formatDate = (date) =>
    new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));
export default function CityItem({ city }) {
    const { emoji, cityName, date, id, position } = city;
    return (
        <Link
            className={styles.cityItem}
            to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        >
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
        </Link>
    );
}
