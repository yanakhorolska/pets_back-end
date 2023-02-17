const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const authRouter = require("./routes/api/authRoutes");
const userRouter = require("./routes/api/userRoutes");
// const petsRouter = require('./routes/api/petsRoutes')
const noticesRouter = require("./routes/api/noticesRoutes");
const newsRouter = require("./routes/api/newsRoutes");
// const sponsorsRouter = require('./routes/api/sponsorsRoutes');
const servicesRouter = require("./routes/api/servicesRoutes");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// app.use("/api/pets", petsRouter)
app.use("/api/notices", noticesRouter);

app.use("/api/news", newsRouter);
app.use("/api/friends", servicesRouter);

// app.use("/api/sponsor", sponsorsRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
