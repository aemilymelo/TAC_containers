const { graphqlHTTP } = require('express-graphql');
const User = require('../models/user');
const generateGenericSchema = require('../schema/genericSchema');

const userGraphQLController = graphqlHTTP({
  schema: generateGenericSchema({ user: User }),
  graphiql: true
});


module.exports = app => app.use('/user', userGraphQLController)