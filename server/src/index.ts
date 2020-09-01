import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildASTSchema } from "graphql";
import schema from "./schema";
import root from "./resolver";
import { config } from "dotenv";

const main = async () => {
  const app = express();

  // .env
  config({ path: `${__dirname}/../.env` });

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: buildASTSchema(schema),
      rootValue: root,
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
