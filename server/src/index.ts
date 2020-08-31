import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const main = async () => {
  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: buildSchema(`
        type RootQuery {
            posts: [String!]!
        }

        type RootMutation {
            createPost(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
      rootValue: {
        posts: () => {
          return ["hello", "guys", "teehee"];
        },
      },
      graphiql: true,
    })
  );

  app.get("/", (_req, res) => {
    res.send("Hello World");
  });

  app.listen(3000);
};

main().catch((err) => {
  console.log(err);
});
