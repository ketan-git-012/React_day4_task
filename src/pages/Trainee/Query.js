import { gql } from "@apollo/client";

const QUERY_GETALLTRAINEE = gql `
    query($limit: String!, $skip: String!) {
        getAllTrainees(limit: $limit, skip: $skip) {
        _id
        email
        firstname
        lastname
        image
        }
    }
`
export {
    QUERY_GETALLTRAINEE
}