import { useState } from "react";
import { Search } from "./components/Search";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <div className="pattern">
        <img src="logo.png" alt="Logo" />
        <div className="wrapper">
          <header>
            <img src="hero.png" alt="Hero Image" />
            <h1>
              Find <span className="text-gradient">Movies</span> You’ll Love
              Without the Hassle
            </h1>
          </header>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <p className="text-red-700">{searchTerm}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
