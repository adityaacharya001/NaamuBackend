# NaamuBackend
Backend services for log in and CRUD operations
NodeJS, ExpressJS and MongoDB

Make a file name nodemon.json and add this code

{
    "env": {
        "MONGO_ATLAS_PW": "Mongoo_password",
        "MONGO_ATLAS_USERNAME": "Mongo_username"
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

3. GET-http://localhost:4000/users
    to get all the list of users with their departments

4. GET-http://localhost:4000/users/+"department"
    to get list of users with given department

5. DELETE-http://localhost:4000/users/+"userID"
    to delete a certain user with userId

6. POST-http://localhost:4000/forms
    Send-: {
        creator: '',
        approver: '',
        approverDepartment: '',
        creatorDepartment: '',
        case: '',
        status: ''
    }

7. GET-http://localhost:4000/forms/formID
    to get details of any form

8. GET-http://localhost:4000/forms/
to get the list of all the forms.

9. PATCH-http://localhost:4000/forms/formID
   Send-:{
       [
           {"propName": "", "value": ""}
       ]
   }

 10. DELETE-http://localhost:4000/forms/formID 
    to delete a form

Hosted Api for backend services-: https://secure-depths-88479.herokuapp.com/forms

Hosted API for socket-server-: https://stormy-crag-26876.herokuapp.com/