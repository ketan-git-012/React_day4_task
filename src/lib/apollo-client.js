
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'


const httpLink = createHttpLink({ uri: 'http://localhost:8000/graphql' })

  console.log("token in session storage:", sessionStorage.getItem('token'))
 const authLink = setContext((_, { headers }) => {
if(sessionStorage.getItem('token')){
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  }
}

})

 const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache()
 })

 export default client;