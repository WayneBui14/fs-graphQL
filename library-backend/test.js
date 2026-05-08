const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('connected to MongoDB');

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`Server ready at ${url}`);
  
  const query = `
    mutation {
      addBook(
        title: "Pimeyden tango",
        author: "Reijo Mäki",
        published: 1997,
        genres: ["crime"]
      ) {
        title,
        author
      }
    }
  `;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  
  console.log(await res.json());
  process.exit(0);
}

run();
