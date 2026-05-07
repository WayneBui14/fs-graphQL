import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries";
import { useState } from "react";
import { UPDATE_AUTHOR } from "../queries";
import { useMutation } from "@apollo/client/react";

const Authors = (props) => {
  const [author, setAuthor] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const result = useQuery(ALL_AUTHORS);

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

  const authors = result.data ? result.data.allAuthors : [];
  const selectedAuthor = author || (authors.length > 0 ? authors[0].name : "");

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name: selectedAuthor, born: parseInt(born) } });
    setAuthor("");
    setBorn("");
  };
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={selectedAuthor}
            onChange={({ target }) => setAuthor(target.value)}
          >
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="text"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
