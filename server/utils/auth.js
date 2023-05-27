const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const authMiddleware = (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    // Check if the token is sent in the headers
    token = context.req.headers.authorization.split(' ')[1];
  } else if (context.connection && context.connection.context.Authorization) {
    // Check if the token is sent in the connection context (subscriptions)
    token = context.connection.context.Authorization.split(' ')[1];
  }

  if (!token) {
    throw new AuthenticationError('You have no token!');
  }

  // if (!token) {
  //   throw req
  // }

  try {
    const decodedToken = jwt.verify(token, secret);
    context.user = decodedToken.data;
  } catch (error) {
    console.log('Invalid token');
    throw new AuthenticationError('Invalid token!');
  }

  return context;
};

module.exports = { authMiddleware };
