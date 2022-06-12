const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql
const axios = require('axios')

const PlaceType = new GraphQLObjectType({
    name: 'PlaceType',
    fields: () => ({
        id: {type: GraphQLString},
        place: {type: GraphQLString},
        jobs: {
            type: GraphQLList(JobFormType),
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/place/${parent.id}/jobForm`)
                    .then(res => res.data)
            }}
    })
})

const JobFormType = new GraphQLObjectType({
    name: 'JobForm',
    fields: () => ({
        id: {type: GraphQLString},
        position: {type: GraphQLString},
        department: {type: GraphQLString},
        place: {
            type: PlaceType,
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/place/${parent.placeId}`)
                    .then(res => res.data)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        jobForm: {
            type: JobFormType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/jobForm/${args.id}`)
                    .then(res => res.data)
            }
        },
        place : {
            type: PlaceType,
            args: {
                id : {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/place/${args.id}`)
                    .then(res => res.data)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addJobForm: {
            type: JobFormType,
            args: {
                position: {type: new GraphQLNonNull(GraphQLString)},
                department: {type: new GraphQLNonNull(GraphQLString)},
                placeId: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, {position, department, placeId}) {
                return axios.post(`http://localhost:3000/jobForm/`, {position, department, placeId})
                    .then(res => res.data)
            }
        },
        deleteJobForm: {
            type: JobFormType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, { id }) {
                return axios.delete(`http://localhost:3000/jobForm/${id}`)
                    .then(res => res.data)
            }
        },
        editJobForm: {
            type: JobFormType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)},
                position: {type: GraphQLString},
                department: {type: GraphQLString},
                placeId: { type: GraphQLString}
            },
            resolve(parent, args) {
                return axios.patch(`http://localhost:3000/jobForm/${args.id}`, args)
                    .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
