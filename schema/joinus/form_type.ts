const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql
const { DetailsType } = require('./details_type')
const { TagsType } = require('./tags_type')

const FormType = new GraphQLObjectType({
    name: 'Form',
    fields: () => ({
        _id: {type: GraphQLString},
        header: {type: GraphQLString},
        tags: {
            type: new GraphQLList(TagsType)
        },
        details: {
            type: new GraphQLList(DetailsType)
        }
    })
})

module.exports = FormType
