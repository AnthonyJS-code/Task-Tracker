const express = require("express");
require("dotenv").config();
const connectDB = require("./db.js");
const getAlltasks = require("./Routes/getAlltasks.js");
const openCreate = require("./Routes/openCreate.js");
const createAccount = require("./Routes/createAccount.js");
const openlogin = require("./Routes/openlogin.js");
const loginValidator = require("./Routes/loginValidator.js");
const openNewTask = require("./Routes/openNewTask.js");
const addNewTask = require("./Routes/addNewTask.js");
const updateTask = require("./Routes/updateTask.js");
const deleteTasks = require("./Routes/deleteTasks.js");
const markDone = require("./Routes/markDone.js");
const logout = require("./Routes/logout.js");
const auth = require("./Middlewares/auth.js");
const localStrategy = require("./Middlewares/localStrategy.js");
const passport = require("passport");
const users = require("./models/users.models");
const session = require("express-session");
const app = express();
const port = process.env.PORT;

passport.use(localStrategy);
passport.serializeUser((user, done) => {
  if (user && user.email) {
    done(null, user.email);
  }
});
app.set("trust proxy", 1);
passport.deserializeUser(async (email, done) => {
  try {
    const user = users.findOne({ email: email });
    done(null, email);
  } catch (e) {
    done(e);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use(
  session({
    secret: process.env.SUPER_SECRET_KEY,
    name:"Session",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/alltasks", auth, getAlltasks);
app.get("/api/create-account", openCreate);
app.get("/api/login", openlogin);
app.get("/api/newTask", auth, openNewTask);
app.get("/api/logout", auth, logout);

app.post("/api/create-account", createAccount);
app.post("/api/login", loginValidator);
app.post("/api/newTask", auth, addNewTask);
app.post("/api/updateTask", auth, updateTask);

app.put("/api/updatetask/:id", auth, markDone);

app.delete("/api/deletetask/:id", auth, deleteTasks);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server Started at port " + port);
  });
});
