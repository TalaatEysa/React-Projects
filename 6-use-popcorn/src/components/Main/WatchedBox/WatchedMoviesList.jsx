import WatchedMovie from './WatchedMovie';

export default function WatchedMoviesList({ watched,onRemoveFromWatched }) {
    return (
        <ul className='list'>
            {watched.map((movie) => (
                <WatchedMovie
                    key={movie.imdbID}
                    movie={movie}
                    onRemoveFromWatched={onRemoveFromWatched}
                />
            ))}
        </ul>
    );
}
