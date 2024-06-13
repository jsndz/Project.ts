import { users } from "../database/db.js";
export const resolvers = {
    Query: {
        users: () => users,
    },
};
