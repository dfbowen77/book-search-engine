// Apollo Client is used to communnicate to the graphql server
import { gql } from '@apollo/client';

// executes the loginUser mutation
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`

// executes the addUser mutation
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
                email
            }
        }
    } 
`

// executes the saveBook mutation
export const SAVE_BOOK = gql`
    mutation saveBook($input: BookInput!){
        saveBook(input: $input){
            _id
            username
            email
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
`

// executes the removeBook mutation
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!){
        removeBook(bookId: $bookId){
            _id
            username
            email
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
`