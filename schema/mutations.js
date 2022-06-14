const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = graphql
const mongoose = require('mongoose')
const Form = mongoose.model('form')

const FormType = require('./joinus/form_type')
const {DetailsInputType} = require('./joinus/details_type')
const {TagsInputType} = require('./joinus/tags_type')

const mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addForm: {
            type: FormType,
            args: {
                header: {type:  new GraphQLNonNull(GraphQLString)},
                tags: {type: new GraphQLList(TagsInputType)},
                details: {type: new GraphQLList(DetailsInputType)}
            },
            resolve(parent, {header, tags, details}) {
                return (new Form({header, tags, details})).save()
            }
        }
    }
})

module.exports = mutations
