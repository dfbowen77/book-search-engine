// Apollo Client is used to communnicate to the graphql server
import { gql } from '@apollo/client';

// executes the 'me' query
export const GET_ME = gql`
    query me {
        me {
          _id
          username
          email
          bookCount
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