const graphql = require('graphql')
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLString } = graphql

const TagsType = new GraphQLObjectType({
    name: 'TagsForm',
    fields: () => ({
        _id: {type: GraphQLString},
        tag: {type: GraphQLString}
    })
})


const TagsInputType = new GraphQLInputObjectType({
    name: 'TagsInputForm',
    fields: () => ({
        _id: {type: GraphQLString},
        tag: {type: GraphQLString}
    })
})


module.exports = {TagsType, TagsInputType}
