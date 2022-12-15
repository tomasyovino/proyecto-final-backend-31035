import { graphqlHTTP } from "express-graphql";
import schema from "../graphql/buildSchema.js";
import { getUser, getProducts, createProduct, updateProduct, deleteProduct, getCart, addProductToCart, deleteProductFromCart } from "../graphql/resolvers.js";

const graphqlRouter = graphqlHTTP({
    schema,
    rootValue: {
      getUser,
      getProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      getCart,
      addProductToCart,
      deleteProductFromCart,
    },
    graphiql: true,
});

export default graphqlRouter;