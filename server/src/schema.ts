import gql from "graphql-tag";

export default gql`
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
`;
