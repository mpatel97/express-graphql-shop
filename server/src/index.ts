import express from "express";
import { graphqlHTTP } from "express-graphql";
import graphQLSchema from "./graphQL/schema";
import userResolver from "./graphQL/resolvers/userResolver";
import productResolver from "./graphQL/resolvers/productResolver";
import productCategoryResolver from "./graphQL/resolvers/productCategoryResolver";
import { connect, connection } from "mongoose";
import { config } from "dotenv";

const main = async () => {
  const app = express();

  // .env
  config({ path: `${__dirname}/../.env` });

  // Setup MongoDB connection
  connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Handle MongoDB connection error
  connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );

  // Setup GraphQL
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphQLSchema,
      rootValue: {
        ...userResolver,
        ...productResolver,
        ...productCategoryResolver,
      },
      graphiql: true,
    })
  );

  app.get("/", (_req, res) => {
    res.send("Hello World");
  });

  app.listen(process.env.PORT || 3000);
};

// Error Handling
main().catch((err) => {
  console.log(err);
});
