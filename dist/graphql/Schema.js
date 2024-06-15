export const typeDefs = `

    type  User {
        id:String
        password:String
        name: String
        email:String
        projects: [project]
    }
    type project {
        id:Int
        title :String
        status : String
        members:[User]
    }
    type Query {
        users: [User]
    }

`;
//# sourceMappingURL=Schema.js.map