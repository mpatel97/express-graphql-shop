import { buildASTSchema } from "graphql";
import gql from "graphql-tag";

export default buildASTSchema(gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
  }

  input ProductInput {
    name: String!
    description: String!
  }

  type ProductCategory {
    id: ID!
    name: String!
    description: String!
    parentProductCategory: String
  }

  input ProductCategoryInput {
    name: String!
    description: String!
    parentProductCategory: String
  }

  type Query {
    users: [User!]!
    user(id: String): User

    products: [Product!]!
    product(id: String): Product

    productCategories: [ProductCategory!]!
    productCategory(id: String): ProductCategory
  }

  type Mutation {
    createUser(userInput: UserInput): User

    createProduct(productInput: ProductInput): Product

    createProductCategory(
      productCategoryInput: ProductCategoryInput
    ): ProductCategory
  }
`);
