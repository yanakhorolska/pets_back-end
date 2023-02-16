const { mongoose } = require("mongoose");
const app = require("./app");
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");
dotenv.config();

const { PORT = 3000, MONGO_URI } = process.env;

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

try {
  mongoose.connect(MONGO_URI);
  console.log("Database connected succsesful");

  app.listen(PORT, () => {
    console.log("Server running. Use our API on port:", PORT);
  });
} catch (error) {
  console.log(error.message);
  process.exit(1);
}
