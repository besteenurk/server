const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql
const FormType = require('./joinus/form_type')
const Form = mongoose.model('form')


const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        Forms: {
            type: new GraphQLList(FormType),
            resolve() {
                return Form.find({})
            }
        },
        Form: {
            type: FormType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, {id}) {
                return Form.findById(id)
            }
        }
    })
})
module.exports = RootQueryType
