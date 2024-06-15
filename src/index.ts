import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./graphql/Schema.js";
import { resolvers } from "./graphql/resolver.js";
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
async function app() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
app();
