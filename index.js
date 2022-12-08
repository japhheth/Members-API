const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const members = require("./Members");

//initialize express
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App",
    members,
  });
});

// use is for middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Members route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Sever is listenning on port ${PORT}`));
