import { buildASTSchema } from "graphql";
import gql from "graphql-tag";

export default buildASTSchema(gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
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
    login(email: String!, password: String!): User!
    currentUser: User

    products: [Product!]!
    product(id: String!): Product

    productCategories: [ProductCategory!]!
    productCategory(id: String!): ProductCategory
  }

  type Mutation {
    register(userInput: UserInput): Boolean!

    createProduct(productInput: ProductInput): Product

    createProductCategory(
      productCategoryInput: ProductCategoryInput
    ): ProductCategory
  }
`);
