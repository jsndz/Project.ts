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
