import { v4 as uuidv4 } from "uuid";
import { client } from "./database/db.js";
import { log } from "console";
await client.connect().then(() => {
    console.log("connected to database");
});
export const readQuery = async (query) => {
    try {
        const res = await client.query(query);
        return res.rows;
    }
    catch (error) {
        console.log(error);
        return [];
    }
};
export const getUserFromTable = async () => {
    try {
        const query = "select * from users";
        return readQuery(query);
    }
    catch (error) {
        console.log(error);
        return [];
    }
};
export const getAssignments = async () => {
    const query = `
    SELECT assignments.user_id, users.name, assignments.project_id, projects.title, projects.status 
    FROM ((users
    INNER JOIN assignments
    ON users.id = assignments.user_id)
    INNER JOIN projects
    ON assignments.project_id = projects.id);
    `;
    return readQuery(query);
};
export const getUserByEmail = async (email) => {
    const query = {
        text: "select * from users where email =$1",
        values: [email],
    };
    try {
        const res = await client.query(query);
        return res.rows;
    }
    catch (err) {
        console.error(err);
        return [];
    }
};
export const addUser = async (email, password, name) => {
    const query = {
        text: " insert into users(id,name,email, password) values($1,$2,$3,$4)",
        values: [uuidv4(), name, email, password],
    };
    const user = await getUserByEmail(email);
    if (user.length === 0) {
        try {
            await client.query(query);
            console.log("user added");
        }
        catch (err) {
            console.error("user couldnt be added");
        }
    }
    else {
        console.log("user already exist");
    }
};
export const add_Assignment = async (user_email, project_id, user_name) => {
    let user_id = "";
    const user = await getUserByEmail(user_email);
    if (user?.length === 0) {
        console.log("User with that email not found.");
    }
    else {
        user_id = user[0].id;
    }
    const query = {
        text: "INSERT INTO assignments(project_id, user_id, user_name) VALUES($1, $2, $3)",
        values: [project_id, user_id, user_name],
    };
    try {
        await client.query(query);
        console.log("Assignment created.");
    }
    catch (err) {
        console.error(err);
    }
};
export const addProject = async (title, status) => {
    const query = {
        text: "INSERT INTO projects(title, status) VALUES($1, $2)",
        values: [title, status],
    };
    try {
        await client.query(query);
        console.log("Project added.");
    }
    catch (err) {
        console.error(err);
    }
};
export const addAssignment = async (user_email, project_id, user_name) => {
    let user_id = "";
    const user = await getUserByEmail(user_email);
    if (user?.length === 0) {
        console.log("User with that email not found.");
    }
    else {
        user_id = user[0].id;
        log(user_id);
    }
    const query = {
        text: "INSERT INTO assignments(project_id, user_id, user_name) VALUES($1, $2, $3)",
        values: [project_id, user_id, user_name],
    };
    try {
        await client.query(query);
        console.log("Assignment created.");
    }
    catch (err) {
        console.error(err);
    }
};
export const getUsers = async () => {
    const usersFromUsersTable = await getUserFromTable();
    const assignments = await getAssignments();
    const users = await usersFromUsersTable?.map(async (user) => {
        let projects = [];
        await assignments?.forEach((assignment) => {
            if (user.id === assignment.user_id) {
                projects.push({
                    id: assignment.project_id,
                    title: assignment.title,
                    status: assignment.status,
                });
            }
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            projects: projects,
        };
    });
    return users;
};
export const createUserTable = async () => {
    const query = `
    CREATE TABLE users (
        id varchar primary key,
        name varchar,
        email varchar,
        password varchar
    )
    `;
    return readQuery(query);
};
export const createProjectTable = async () => {
    const query = `
    CREATE TABLE projects (
        id serial primary key,
        title varchar,
        status varchar
    )
    `;
    return (await readQuery(query))
        ? "Table created."
        : "Unable to create table.";
};
export const createAssignmentTable = async () => {
    const query = `
    CREATE TABLE assignments (
        id serial,
        project_id int references projects (id),
        user_id varchar references users (id),
        primary key (id),
        user_name varchar
    )
    `;
    return (await readQuery(query)) ? "Table created" : "Unable to create table.";
};
export const listTables = async () => {
    const query = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
    `;
    try {
        const res = await client.query(query);
        console.log(res.rows);
    }
    catch (err) {
        console.error(err);
    }
};
//# sourceMappingURL=utils.js.map