const { AuthenticationError } = require('apollo-server-express');
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        // Get the current user by their id and populate their saved books
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('savedBooks');
          }
          throw new AuthenticationError('You need to be logged in!');
        },
    },
      Mutation: {
        // Create a new user
        addUser: async (parent, { username, email, password}, context) => {
            const user = await User.create({username, email, password})
            const token = signToken(user)
            return { token, user }
        },
        // login a user
        login: async (parent, { email, password}, context) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('Invalid email address! Try again')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password! Try again!')
            }

            const token = signToken(user);
            return { token, user };
        },
        // save a book for future reference
        saveBook: async (parent, {input}, context) => {
          if(context.user) {
            const saveUserBook = await User.findByIdAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks: input}},
                {new: true, runValidators: true}
            )
            return saveUserBook
          }  
          throw new AuthenticationError('Please login to save a book!')
        },
        // remove a book from saved books list
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updateBook = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: { savedBooks: { bookId } } },
                    {new: true}
                )
                return updateBook
            }
            throw new AuthenticationError('Please login to remove a book')
        }

    },
};

module.exports = resolvers;