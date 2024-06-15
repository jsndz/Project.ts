import pg from "pg";
const { Client } = pg;
export const client = new Client({
    user: "postgres",
    password: "user.ts",
    host: "localhost",
    database: "user.ts",
    port: 5432,
});
//# sourceMappingURL=db.js.map