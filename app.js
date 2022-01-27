const express = require("express");
const connect = require("./schemas");
const cors = require("cors");

const app = express();
const port = 3001;



connect();

const articleRouter = require("./routes/articles");

const requestMiddleware = (req, res, next) => {
    console.log("Request Url :", req.originalUrl, " - ", new Date());
    next();
}
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleware); 
app.use(cors());

app.use("/api", [articleRouter]);

app.get("/", (req, res) => {
    res.send("Hi!")
});


app.listen(port, () => {
    console.log (port, "포트로 서버가 켜졌어요!");
});