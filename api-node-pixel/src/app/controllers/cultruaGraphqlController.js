const { graphqlHTTP } = require('express-graphql');
const Cultura = require('../models/culturas');
const generateGenericSchema = require('../schema/genericSchema');

const userGraphQLController = graphqlHTTP({
  schema: generateGenericSchema({ cultura: Cultura }),
  graphiql: true
});


module.exports = app => app.use('/cultura', userGraphQLController)