const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const app = express();
const port = process.env.PORT || 3000;
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'FirstSchema',
        fields:  () => ({
            message: {type: GraphQLString, 
                resolve: () => 'Hello World'
            },
        })
    })
});

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Running server on ${port}`);
});