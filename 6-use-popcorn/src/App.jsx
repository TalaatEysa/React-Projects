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
    const [query, setQuery] = useState('interstellar');
    const [selecteId, setSelectedId] = useState(null);

    function handleSelectMovie(id) {
        setSelectedId((selecteId) => (id === selecteId ? null : id));
    }
    function handleCloseMovie() {
        setSelectedId(null);
    }
    useEffect(
        function () {
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError('');
                    const res = await fetch(
                        `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
                    );
                    if (!res.ok)
                        throw new Error(
                            'Something went wrong while fetching movies.'
                        );

                    const data = await res.json();
                    if (data.Response === 'False')
                        throw new Error('Movie not found.');
                    setMovies(data.Search);
                } catch (err) {
                    console.error(err.message);
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 3) {
                setMovies([]);
                setError('');
                return;
            }
            fetchMovies();
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
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList watched={watched} />
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
