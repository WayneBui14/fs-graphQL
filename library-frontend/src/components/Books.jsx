import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("all genres");
  const result = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }
  if (result.error) {
    console.error("GraphQL error:", result.error);
    return <div>Error! {result.error.message}</div>;
  }

  const books = result.data ? result.data.allBooks : [];
  const allGenres = [...new Set(books.flatMap((b) => b.genres))];
  const booksToShow =
    genreFilter === "all genres"
      ? books
      : books.filter((book) => book.genres.includes(genreFilter));

  return (
    <div>
      <h2>books</h2>
      {genreFilter !== "all genres" && (
        <p>
          in genre <strong>{genreFilter}</strong>
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
          {booksToShow.map((a) => (
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
          <button key={genre} onClick={() => setGenreFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenreFilter("all genres")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
