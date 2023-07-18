import express  from "express";
import dotenv from "dotenv";
import Connection from "./config/dbConfig.js";
import usersRoute from "./routes/usersRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import examsRoute from "./routes/examsRoute.js";
import reportsRoute from "./routes/reportsRoute.js";
import  Path from "path";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/users",usersRoute);
app.use("/api/exams",examsRoute);
app.use("/api/reports",reportsRoute);

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});


app.listen(port, () =>{
  console.log(`server is running on port ${port}`);
});

Connection();