
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

const mapMongooseTypeToGraphQL = (mongooseType) => {
  switch (mongooseType) {
    case String: return GraphQLString;
    case Number: return GraphQLInt;
    case 'String': return GraphQLString;
    case 'Number': return GraphQLInt;
    default: return GraphQLString;
  }
};

function createGraphQLType(model, name) {
  const schemaPaths = model.schema.paths;
  const fields = {};

  for (const key in schemaPaths) {
    if (key === '__v') continue;
    const field = schemaPaths[key];
    const type = field.instance || field.options.type;

    fields[key] = {
      type: field.isRequired ? new GraphQLNonNull(mapMongooseTypeToGraphQL(type)) : mapMongooseTypeToGraphQL(type)
    };
  }

  return new GraphQLObjectType({
    name,
    fields: () => fields
  });
}

module.exports = createGraphQLType;
