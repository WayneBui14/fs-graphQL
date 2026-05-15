import { useQuery } from "@apollo/client/react";
import { ME, ALL_BOOKS } from "../queries";

const Recommendation = ({ show }) => {
  const result = useQuery(ME);
  const booksResult = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }
  if (result.loading || booksResult.loading) {
    return <div>loading...</div>;
  }
  if (result.error || booksResult.error) {
    console.error("GraphQL error:", result.error || booksResult.error);
    return (
      <div>Error! {result.error?.message || booksResult.error?.message}</div>
    );
  }

  const user = result.data?.me;
  const books = booksResult.data?.allBooks;

  if (!user || !books) {
    return null;
  }

  const recommendedBooks = books.filter((book) =>
    book.genres.includes(user.favoriteGenre),
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </p>
      <table>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {recommendedBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
