import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "handling get request at url"
    })
})

export default app;



