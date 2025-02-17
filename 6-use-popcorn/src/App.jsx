import { useEffect, useState } from 'react';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import Search from './components/NavBar/Search';
import NumResults from './components/NavBar/NumResults';
import MovieList from './components/Main/ListBox/MovieList';
import Box from './components/Main/Box';
import WatchedMoviesList from './components/Main/WatchedBox/WatchedMoviesList';
import WatchedSummary from './components/Main/WatchedBox/WatchedSummary';
import MovieDetails from './components/Main/ListBox/MovieDetails';

const KEY = 'b1bc54bd';
export const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
    const [watched, setWatched] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [selecteId, setSelectedId] = useState(null);

    function handleSelectMovie(id) {
        setSelectedId((selecteId) => (id === selecteId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddToWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleRemoveFromWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError('');
                    const res = await fetch(
                        `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
                    );
                    if (!res.ok)
                        throw new Error(
                            'Something went wrong while fetching movies.'
                        );

                    const data = await res.json();
                    if (data.Response === 'False')
                        throw new Error('Movie not found.');
                    setMovies(data.Search);
                    setError('');
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        setError(err.message);
                        console.log(err.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 3) {
                setMovies([]);
                setError('');
                return;
            }
            handleCloseMovie();
            fetchMovies();
            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return (
        <>
            <NavBar>
                <Search
                    query={query}
                    setQuery={setQuery}
                />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selecteId ? (
                        <MovieDetails
                            selectedId={selecteId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddToWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList
                                watched={watched}
                                onRemoveFromWatched={handleRemoveFromWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

export function Loader() {
    return <p className='loader'>Loading...</p>;
}
function ErrorMessage({ message }) {
    return (
        <p className='error'>
            <span>⛔</span> {message}
        </p>
    );
}
