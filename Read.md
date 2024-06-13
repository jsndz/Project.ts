import { resolvers } from "./graphql/resolver.ts";
import { typeDefs } from "./graphql/schema.ts";

import { ApolloServer } from "apollo-server";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: { url: string }) => {
console.log(`Server listening at ${url}`);
});
import { users } from "../../database/db.js";
export const resolvers = {
Query: {
users: () => users,
},
};
export const typeDefs = `

    type  User {

        name: String,
        email:String
        projects: [project]
    }
    type project {
        title :String
        active : Boolean
        members:[User]
    }
    type Query {
        users: [User]
    }

`;
export const users = [
{
name: "Kai",
email: "KaiChopin@gmail.com",
projects: [{ title: "Site upgrade" }],
},
{
name: "Kail",
email: "Kail@gmail.com",
projects: [{ title: "Site upgrade" }],
},
];
