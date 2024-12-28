import { Injectable } from '@angular/core';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';


@Injectable({
  providedIn: 'root'
})
export class GraphqlconfigService {

  constructor() { }

  // Create separate Apollo clients for different services [Client, Product]
  createProductClient(){
    return new ApolloClient({
      link: createHttpLink({
        uri: 'http://localhost:8094/product/graphql',
        headers: {

        }
      }),
      cache: new InMemoryCache()
    })
  }

  createClientServiceClient(){
    return new ApolloClient({
      link: createHttpLink({
        uri: 'http://localhost:8094/client/graphql',
        headers:{

        }
      }),
      cache: new InMemoryCache()
    })
  }

}
