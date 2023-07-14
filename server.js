require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful!");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
