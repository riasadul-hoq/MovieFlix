// MovieCard.jsx - Displays individual movie details in a card format
// Props: movie (object with movie details)

const MovieCard = ({
  movie: { poster_path, title, vote_average, original_language, release_date },
}) => {
  // Render a single movie card with poster, title, rating, language, and year
  return (
    <div className="movie-card">
      {/* Movie poster image, fallback to placeholder if not available */}
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "./no-movie.png"
        }
        alt={title}
      />

      <div className="mt-4">
        {/* Movie title */}
        <h3>{title}</h3>

        <div className="content">
          {/* Movie rating with star icon */}
          <div className="rating">
            <img src="./star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          {/* Movie original language */}
          <p className="lang">
            {original_language ? original_language : "N/A"}
          </p>

          <span>•</span>
          {/* Movie release year */}
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
