const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const app = express();
const port = process.env.PORT || 3000;
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const authors = [
    {id: 1, name: "Stephen King"},
    {id: 2, name: "J.K. Rowling"},
    {id: 3, name: "Agatha Christie"},
    {id: 4, name: "Dan Simmons"},
    {id: 5, name: "Beverly Cleary"}
];

const books = [
    {id: 1, name: "The Shining", authorId: 1},
    {id: 2, name: "Salems Lot", authorId: 1},
    {id: 3, name: "Ramona and Her Father", authorId: 5},
    {id: 4, name: "Harry Potter and the Half Blood Prince", authorId: 2},
    {id: 5, name: "A Murder is Announced", authorId: 3},
    {id: 6, name: "Ramona the Brave", authorId: 5},
    {id: 7, name: "Hyperion", authorId: 4},
    {id: 8, name: "It", authorId: 1},
    {id: 9, name: "Harry Potter and the Order of the Phoenix", authorId: 2},
    {id: 10, name: "Murder on the Orient Express", authorId: 3},
];

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "A novel or novella written by an author.",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)}
    })
});

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root query",
    fields: () => ({
        books: {
            type: GraphQLList(BookType),
            description: "A list of books.",
            resolve: () => books
        }
    })
});


const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Running server on ${port}`);
});