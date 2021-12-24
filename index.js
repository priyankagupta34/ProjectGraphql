const { ApolloServer, gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    greeting: String
  }
`;
console.log("jskk");
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    greeting: (root, args, context) =>
      "This is Priyanka! You are viewing graphql"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen({ port: 4100 })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch((err) =>
    console.log(
      `Trouble starting server ar port 4100\nMay be this port is already used! Or may be not... check it out`
    )
  );
