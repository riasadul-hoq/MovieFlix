# MovieFlix

MovieFlix is a React application that allows users to search for movies and view trending and popular movies using The Movie Database (TMDb) API. It also uses [Appwrite](https://appwrite.io/) as a backend service for tracking trending movies and search analytics.

## Features

- Search for movies by title
- View trending movies (powered by Appwrite backend)
- View popular movies
- Debounced search for better performance
- Loading spinners and error handling

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- Appwrite instance (cloud or self-hosted) for trending/search analytics (optional, but recommended)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/riasadulhoq/MovieFlix.git
   cd MovieFlix
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory and add your TMDb API key:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```
4. (Optional) Configure your Appwrite endpoint and project in `src/appwrite.js` if you want to enable trending/search analytics features.

### Running the App

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Project Structure

```
MovieFlix/
├── public/
│   └── ...assets
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── Search.jsx
│   │   └── Spinner.jsx
│   ├── App.jsx
│   ├── appwrite.js  # Appwrite backend integration
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## Credits

- [TMDb API](https://www.themoviedb.org/documentation/api)
- [Appwrite](https://appwrite.io/) for backend services
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

## License

This project is licensed under the MIT License.
