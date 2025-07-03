import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
// import { useDebounce } from 'use-debounce';
import { getTrendingMovies, updateSearchCount } from "./appwrite";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [errorTrendingMessage, setErrorTrendingMessage] = useState("");

  // const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    1000,
    [searchTerm]
  );

  // console.log("Trending Movies:", trendingMovies);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    // Reset error state before fetching
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      // throw new Error(`Error thrown, Failed to fetch movies`);

      if (!response.ok) {
        throw new Error(`Response Not Okay, Failed to fetch movies`);
      }

      const data = await response.json();
      // console.log(data);

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Data Error, Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      // console.log("Movies fetched successfully:", data.results);

      if (query && data.results.length > 0) {
        await updateSearchCount(searchTerm, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      // setErrorMessage(error.message);
      setErrorMessage(
        "Catched Error, Failed to fetch movies. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    setIsTrendingLoading(true);
    setErrorTrendingMessage("");
    try {
      const movies = await getTrendingMovies();
      // console.log(movies);
      setTrendingMovies(movies || []);
    } catch (error) {
      console.error(`Error loading trending movies: ${error}`);
      // setErrorTrendingMessage(error.message);
      setErrorTrendingMessage(
        "Catched Error, Failed to load trending movies. Please try again later."
      );
    } finally {
      setIsTrendingLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  // console.log(movieList);

  return (
    <main>
      <div className="pattern">
        {/* <img src="logo.png" alt="Logo" /> */}
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You’ll Love
              Without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* <p className="text-red-700">{searchTerm}</p> */}
          </header>
          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending</h2>
              {isTrendingLoading ? (
                <Spinner />
              ) : errorTrendingMessage ? (
                <p className="text-red-500">{errorTrendingMessage}</p>
              ) : (
                <ul>
                  {trendingMovies.map((movie, index) => (
                    <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.searchTerm} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
          <section className="all-movies">
            <h2>Popular</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}></MovieCard>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
