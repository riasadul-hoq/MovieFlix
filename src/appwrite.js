// appwrite.js - Appwrite backend integration for MovieFlix
// Handles trending movies and search analytics

import { Client, Databases, ID, Query } from "appwrite";

// Environment variables for Appwrite configuration
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite API endpoint
  .setProject(PROJECT_ID); // Appwrite project ID

// Initialize Appwrite Databases service
const databases = new Databases(client);

/**
 * updateSearchCount - Updates the search count for a movie search term in Appwrite.
 * If the search term exists, increments its count. Otherwise, creates a new document.
 * Also stores poster URL and movie ID for trending display.
 * @param {string} searchTerm - The search term entered by the user
 * @param {object} movie - The movie object from TMDb API
 */
export const updateSearchCount = async (searchTerm, movie) => {
  //   console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);
  try {
    // Query for existing document with the same search term
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.documents.length > 0) {
      // If found, increment the count
      const doc = result.documents[0];
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      // If not found, create a new document for this search term
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: searchTerm,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        movie_id: movie.id,
      });
    }
  } catch (error) {
    // Log any errors that occur during update/create
    console.error("Error updating search count:", error);
  }
};

/**
 * getTrendingMovies - Fetches the top 5 trending movies from Appwrite, ordered by search count.
 * @returns {Array} Array of trending movie documents
 */
export const getTrendingMovies = async () => {
  try {
    // Query for top 5 movies ordered by descending count
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);

    return result.documents;
  } catch (error) {
    // Log any errors that occur during fetch
    console.error("Error fetching trending movies:", error);
  }
};
