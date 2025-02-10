import { useEffect, useState } from 'react';
import StarRating from '../../StarRating/StarRating';
import { Loader } from '../../../App';

const KEY = 'b1bc54bd';

export default function MovieDetails({ selectedId, onCloseMovie }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                );
                const data = await res.json();
                setMovie(data);
                setIsLoading(false);
            }
            getMovieDetails();
        },
        [selectedId]
    );
    return (
        <div className='details'>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button
                            className='btn-back'
                            onClick={onCloseMovie}
                        >
                            &larr;
                        </button>
                        <img
                            src={poster}
                            alt={`Poster of movie ${movie}`}
                        />
                        <div className='details-overview'>
                            <h2>{title}</h2>
                            <p>{released}</p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDB rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className='rating'>
                            <StarRating
                                maxRating={10}
                                size={24}
                            />
                        </div>
                        <p>
                            <strong>Plot : </strong>
                            <em>{plot}</em>
                        </p>
                        <p>
                            <strong>Starring : </strong> {actors}
                        </p>
                        <p>
                            <strong>Directed by : </strong> {director}
                        </p>
                    </section>
                </>
            )}
        </div>
    );
}
