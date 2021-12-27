const fs = require("fs");
const resolvers = require("./graphqlRL/resolver.js");
const { ApolloServer, gql } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

const port = 9000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();

app.use(
  cors(),
  bodyParser.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false
  })
);

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   const user = db.users.list().find((user) => user.email === email);
//   if (!(user && user.password === password)) {
//     res.sendStatus(401);
//     return;
//   }
//   const token = jwt.sign({ sub: user.id }, jwtSecret);
//   res.send({ token });
// });

// Construct a schema, using GraphQL schema language
/* utf-8 so tht function read this file as string and not binary */
const typeDefs = gql(
  fs.readFileSync("./graphqlRL/schema.graphql", { encoding: "utf-8" })
);

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.start().then(() => {
  console.log("starting ");
  apolloServer.applyMiddleware({ app, path: "/graphql" });
});

console.log("hjksjk");

app.listen(port, () => console.info(`Server started on port ${port}`));
