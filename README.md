# NaamuBackend
Backend services for log in and CRUD operations
NodeJS, ExpressJS and MongoDB

Make a file name nodemone.js and add this code

{
    "env": {
        "MONGO_ATLAS_PW": "MongoDB Paasword"
    }
}

APIs List

1. POST-http://localhost:4000/signUp
    Send -: {
        username: "username",
        password: "passwword",
        department: "department"
    }
2. POST-http://localhost:4000/signIn
    Send -: {
        username: "username",
        password: "password"
    }      