import { useState } from 'react';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import Search from './components/NavBar/Search';
import NumResults from './components/NavBar/NumResults';
import MovieList from './components/Main/ListBox/MovieList';
import Box from './components/Main/Box';
import WatchedMoviesList from './components/Main/WatchedBox/WatchedMoviesList';
import WatchedSummary from './components/Main/WatchedBox/WatchedSummary';
import MovieDetails from './components/Main/ListBox/MovieDetails';
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

export const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
    const [query, setQuery] = useState('');
    const [selecteId, setSelectedId] = useState(null);

    const { movies, isLoading, error } = useMovies(query);

    const [watched, setWatched] = useLocalStorageState([], 'watched');

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
