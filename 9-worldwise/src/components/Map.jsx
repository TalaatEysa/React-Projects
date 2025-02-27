import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Map.module.css';
import { useState } from 'react';
import { useCities } from '../context/CitiesContext';

export default function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const navigate = useNavigate();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    return (
        <div className={styles.mapContainer}>
            <MapContainer
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.mapContainer}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>
                                <img
                                    src={city.emoji}
                                    alt='❌'
                                    width='30'
                                />
                            </span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
