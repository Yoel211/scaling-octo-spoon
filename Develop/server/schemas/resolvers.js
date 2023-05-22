const { Book, User } = require('../models');

const resolvers = {
    Query: {
        // get all books
        books: async () => {
            return Book.find({});
        },
        // get a book by id
        book: async (parent, { bookId }) => {
            const params = bookId ? { bookId } : {};
            return Book.find(params);
        },
        // get all users
        users: async () => {
            return User.find({});
        },
        // get a user by username
        user: async (parent, { username }) => {
            const params = username ? { username } : {};
            return User.find(params);
        },
    },
    Mutation: {
        // create a user, sign up
        createUser: async (parent, args) => {
            const user = await User.create(args);   
            return user;
        },
        // login a user
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
        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                try {
                    const { userId, title, author } = input;
                    const user = await User.findById(userId);
                    if (!user) {
                      throw new Error('User not found');
                    }
              
                    const book = {
                      title,
                      author,
                    };
              
                    user.books.push(book);
                    await user.save();
              
                    return user;
                  } catch (error) {
                    throw new Error('Failed to save the book');
                  }
                } else {
                  throw new Error('Authentication required');
            }
        },
        // remove a book from `savedBooks`
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const book = await Book.findOneAndDelete({
                    _id: bookId,
                    username: context.user.username,
                });
                return book;
            } else {
                throw new Error('Authentication required');
            }
        },
        
    }
}
                



module.exports = resolvers;