import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import signInRoutes from "./api/routes/signIn";
import signUpRoutes from "./api/routes/signUp";
import formsRoutes from "./api/routes/forms";
import usersRoutes from './api/routes/users';


const app = express();

mongoose.connect('mongodb+srv://aditya2012ece:' + process.env.MONGO_ATLAS_PW + '@mern-rxmjv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log("MongoDB server connected !!!!!");
}).catch((err) => {
    console.log("Error : " + err);
});

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Control-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).json({});
    }
    next();
});

// app.get("/", (req, res)=>{
//     res.status(200).json({
//         message: "handling get request at url"
//     })
// })

app.use("/signUp", signUpRoutes);
app.use("/signIn", signInRoutes);
app.use("/forms", formsRoutes);
app.use("/users", usersRoutes);



app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

export default app;



