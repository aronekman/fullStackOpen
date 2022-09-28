const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('./models/book');
const Author = require('./models/author');

console.log('connecting to', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message);
  });

const { v1: uuid } = require('uuid');

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => Book.find({}),
    allAuthors: async () => Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      }
      const book = new Book({ ...args, author });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
      return book;
    },
    editAuthor: (root, args) => {
      const index = authors.findIndex(author => author.name === args.name);
      if (index == -1) return null;
      const newAuthor = { ...authors[index], born: args.setBornTo };
      authors.splice(index, 1, newAuthor);
      return newAuthor;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
