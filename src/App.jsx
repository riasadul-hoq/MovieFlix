import { useEffect, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    // Reset error state before fetching
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

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

  useEffect(() => {
    fetchMovies(); //Runs only on the first render
  }, []);

  // console.log(moviesList);

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
            <p className="text-red-700">{searchTerm}</p>
          </header>
          <section className="all-movies">
            <h2 className="mt-[40px]">All Movies</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <p className="text-white" key={movie.id}>
                    {movie.title}
                  </p>
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
