const express = require("express");
const color = require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

const app = express();

// connect to MongoDB
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the GraphQL API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
