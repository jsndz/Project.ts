import { getUsers } from "../utils.js";
export const resolvers = {
    Query: {
        users: () => getUsers(),
    },
};
//# sourceMappingURL=resolver.js.map