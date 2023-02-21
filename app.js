const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const qs = require("qs");

require("dotenv").config();

const authRouter = require("./routes/api/authRoutes");
const userRouter = require("./routes/api/userRoutes");
const petsRouter = require('./routes/api/petsRoutes');
const noticesRouter = require("./routes/api/noticesRoutes");
const newsRouter = require("./routes/api/newsRoutes");
// const sponsorsRouter = require('./routes/api/sponsorsRoutes');
const servicesRouter = require("./routes/api/servicesRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/care-pets-en.json");


const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.set("query parser", function (str) {
  return qs.parse(str, { ignoreQueryPrefix: true });
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/users", userRouter);

app.use("/api/pets", petsRouter)
app.use("/api/notices", noticesRouter);

app.use("/api/news", newsRouter);
app.use("/api/friends", servicesRouter);

// app.use("/api/sponsor", sponsorsRouter)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({message});
});

module.exports = app;
