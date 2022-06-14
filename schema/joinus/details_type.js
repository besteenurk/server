const graphql = require('graphql')
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql


const DetailsType = new GraphQLObjectType({
    name: 'DetailsForm',
    fields: () => ({
        _id: {type: GraphQLString },
        header: {type: GraphQLString},
        text: {type: GraphQLString},
    })
})


const DetailsInputType = new GraphQLInputObjectType({
    name: 'DetailsInputForm',
    fields: () => ({
        _id: {type: GraphQLString },
        header: {type: GraphQLString},
        text: {type: GraphQLString},
    })
})


module.exports = {DetailsType, DetailsInputType}
