// Search.jsx - Search bar component for MovieFlix
// Props: searchTerm (string), setSearchTerm (function)

const Search = ({ searchTerm, setSearchTerm }) => {
  // Render a search input with a search icon
  return (
    <div className="search">
      <div>
        {/* Search icon for visual cue */}
        <img src="./search.svg" alt="Search" />

        {/* Controlled input for movie search */}
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        ></input>
      </div>
    </div>
  );
};

export default Search;
