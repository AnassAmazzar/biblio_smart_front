import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { APOLLO_NAMED_OPTIONS, APOLLO_OPTIONS, provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
// import { GraphqlconfigService } from './service/apolloconfig/graphqlconfig.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(), provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      provide : APOLLO_OPTIONS

      return {
        link: httpLink.create({
          uri: 'http://localhost:8094/graphql',
        }),
        cache: new InMemoryCache(),
      };
    }),
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
          client: {
            cache: new InMemoryCache(),
            link: httpLink.create({ uri: 'http://localhost:8094/client/graphql' }),
          },
          product: {
            cache: new InMemoryCache(),
            link: httpLink.create({ uri: 'http://localhost:8094/product/graphql' }),
          },
          authentification: {
            cache: new InMemoryCache(),
            link: httpLink.create({ uri: 'http://localhost:8094/auth/graphql' }),
          }
      }),
      deps: [HttpLink],
    }
  ]
};

/*
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(), provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      provide : APOLLO_OPTIONS

      return {
        link: httpLink.create({
          uri: 'http://localhost:8094/graphql',
        }),
        cache: new InMemoryCache(),
      };
    })
  ]
};





export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(), provideHttpClient(),
    //provideApollo()
    {
      provide: APOLLO_OPTIONS,
      useFactory: (
        httpLink: HttpLink,
        configService: GraphqlconfigService
      )=>{
        return {
          // You can still use the default client if needed
          defaultClient: new ApolloClient({
            link: httpLink.create({ uri: 'http://localhost:8094/graphql' }),
            cache: new InMemoryCache()
          }),
          // Named clients for specific services
          clients: {
            product: configService.createProductClient(),
            client: configService.createClientServiceClient()
          }
        };
      },
      deps: [HttpLink, GraphqlconfigService]
    }
  ]
};

*/
