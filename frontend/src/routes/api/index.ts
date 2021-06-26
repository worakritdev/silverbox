import type { EndpointOutput, RequestHandler } from '@sveltejs/kit';
import { ApolloServer, gql } from 'apollo-server-lambda';
import dbconnect from "$lib/middleware/mongodb";
import Page from '$lib/models/pageSchema';
import mongoose from "mongoose";

const typeDefs = gql`
type Query {
    hello: String
    getAllPages:[Page]
    getPage(id:ID):Page
}
type Page {
    id:ID!
    title:String
    content:String
    author:String
    url:String
    comment:[Comment]
    categories:[Category]
}
type Category {
    name:String
    Pages:[Page]
}
type Comment {
    body:String
    date:String
}
type Mutation {
    double(x: Int!): Int!
}
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        getAllPages: async () => {
            return await Page.find()
        },
        getPage: async (args) => {
            return await Page.findById(mongoose.Types.ObjectId(args.id))

        }
    },
    Mutation: {
        double: (_, { x }) => x * 2
    }
};
const connect = async () => {

    return await dbconnect
}
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    tracing: true
});

const graphqlHandler = apolloServer.createHandler();

// This is where the magic happens.
const handler: RequestHandler = async (args) => {
    return await new Promise<EndpointOutput>((resolve, reject) => {

        graphqlHandler(
            {
                httpMethod: args.method,
                headers: args.headers,
                path: args.path,
                body: args.rawBody as string
            } as any,
            {} as any,
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        status: result.statusCode,
                        body: result.body,
                        headers: result.headers as any
                    });
                }
            }
        ) as any;
    });
};

export const head = handler;
export const get = handler;
export const post = handler;