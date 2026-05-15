import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("all genres");
  
  // Fetch all books to compute the list of all available genres
  const { data: allBooksData, refetch: refetchAllBooks } = useQuery(ALL_BOOKS);
  
  // Fetch only the books for the selected genre
  const { data, loading, error, refetch: refetchBooks } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre === "all genres" ? null : selectedGenre },
  });

  if (!props.show) {
    return null;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.error("GraphQL error:", error);
    return <div>Error! {error.message}</div>;
  }

  const books = data ? data.allBooks : [];
  const allGenres = allBooksData 
    ? [...new Set(allBooksData.allBooks.flatMap((b) => b.genres))]
    : [];

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    refetchAllBooks();
    refetchBooks({ genre: genre === "all genres" ? null : genre });
  };

  return (
    <div>
      <h2>books</h2>
      {selectedGenre !== "all genres" && (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      )}
      <table>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((genre) => (
          <button key={genre} onClick={() => handleGenreSelect(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleGenreSelect("all genres")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
