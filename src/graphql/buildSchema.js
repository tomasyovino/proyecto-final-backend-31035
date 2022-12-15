import { buildSchema } from "graphql";

const schema = buildSchema(`
    type User {
        id: ID!,
        username: String,
        email: String,
        direction: String,
        birthDate: Int,
        phoneNumber: Int,
        imgUrl: String
    }
    type Product {
        id: ID!,
        title: String,
        price: Int,
        thumbnail: String,
        quantity: Int
    }
    input ProductInput {
        title: String,
        price: Int,
        thumbnail: String,
        quantity: Int
    }
    type Cart {
        id: ID!,
        userId: ID!,
        products: [Product]
    }
    type Query {
        getUser(id: ID): User,
        getProducts(field: String, value: String): [Product],
        getCart(userId: ID): Cart,
    }
    type Mutation {
        createProduct(data: ProductInput): Product,
        updateProduct(id: ID!, data: ProductInput): Product,
        deleteProduct(id: ID!): [Product],
        addProductToCart(userId: ID!, productId: ID!): Cart,
        deleteProductFromCart(userId: ID!, productId: ID!): Cart,
    }
`);

export default schema;