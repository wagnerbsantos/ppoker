const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Room = require("./resolvers/Room");
const fs = require("fs");
const path = require("path");

//Depois que estiver funcionando considerar migrar pra typescript
//https://stackoverflow.com/questions/67830070/graphql-apollo-server-resolvers-arguments-types

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const resolvers = {
  Query,
  Mutation,
  Room,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
    };
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      if (connectionParams.authToken) {
        return {
          prisma,
        };
      } else {
        return {
          prisma,
        };
      }
    },
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
