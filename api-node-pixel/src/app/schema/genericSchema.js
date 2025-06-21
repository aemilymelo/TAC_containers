const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql');

function genericSchema(models) {
  try {
    const types = {};
    const queries = {};
    const mutations = {};

    Object.entries(models).forEach(([name, model]) => {
      const fields = {
        id: { type: GraphQLID }
      };

      Object.entries(model.schema.paths).forEach(([fieldName, fieldType]) => {
        if (fieldName === '__v') return;

        if (fieldType.instance === 'String') fields[fieldName] = { type: GraphQLString };
        else if (fieldType.instance === 'Number') fields[fieldName] = { type: GraphQLInt };
        else if (fieldType.instance === 'ObjectID') fields[fieldName] = { type: GraphQLID };
      });

      const type = new GraphQLObjectType({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        fields: () => fields
      });

      types[name] = type;

      queries[name] = {
        type,
        args: { id: { type: GraphQLID } },
        resolve(_, args) {
          return model.findById(args.id);
        }
      };

      queries[name + 's'] = {
        type: new GraphQLList(type),
        resolve() {
          return model.find();
        }
      };

      mutations['add' + capitalize(name)] = {
        type,
        args: fields,
        resolve(_, args) {
          return new model(args).save();
        }
      };

      mutations['delete' + capitalize(name)] = {
        type,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(_, args) {
          return model.findByIdAndDelete(args.id);
        }
      };
    });

    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({ name: 'RootQuery', fields: queries }),
      mutation: new GraphQLObjectType({ name: 'Mutation', fields: mutations })
    });

    return schema;
  } catch (err) {
    console.error('Erro ao gerar schema:', err);
    throw err;
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = genericSchema;
