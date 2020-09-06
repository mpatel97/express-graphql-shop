import express from "express";
import { graphqlHTTP } from "express-graphql";
import graphQLSchema from "./graphQL/schema";
import userResolver from "./graphQL/resolvers/userResolver";
import productResolver from "./graphQL/resolvers/productResolver";
import productCategoryResolver from "./graphQL/resolvers/productCategoryResolver";
import { connect, connection } from "mongoose";
import session from "express-session";
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

  app.use(express.json());

  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
    })
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
main()
  .then(() => {
    console.log(
      `Server started on http://localhost:${process.env.PORT || 3000}/graphql`
    );
  })
  .catch((err) => {
    console.log(err);
  });
