const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');

const resolvers = {
  Query: {
    books: async () => {
      return Book.find({});
    },
    book: async (parent, { bookId }) => {
      return Book.findById(bookId);
    },
    users: async () => {
      return User.find({});
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      return user;
    },
    saveBook: async (parent, { input }, { user }) => {
      if (user) {
        try {
          const { title, author } = input;

          const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $addToSet: { savedBooks: { title, author } } },
            { new: true }
          );

          return updatedUser;
        } catch (error) {
          throw new Error('Failed to save the book');
        }
      } else {
        throw new AuthenticationError('Authentication required');
      }
    },
    removeBook: async (parent, { bookId }, { user }) => {
      if (user) {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $pull: { savedBooks: { _id: bookId } } },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error('Book not found');
        }

        return updatedUser;
      } else {
        throw new AuthenticationError('Authentication required');
      }
    },
  },
};

module.exports = resolvers;
