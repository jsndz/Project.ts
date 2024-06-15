import { getUsers } from "../utils.js";
export const resolvers = {
  Query: {
    users: () => getUsers(),
  },
};
