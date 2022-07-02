import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { GRAPHQL_API_URL, GRAPHQL_API_KEY, GRAPHQL_API_WS_URL, IS_DEV } from '../constants';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

// TODO Check credentials and production mode
const createHttpLink = (headers) => {
  return new HttpLink({
    uri: GRAPHQL_API_URL,
    // credentials: 'include',
    headers, // auth token is fetched on the server side
    fetch
  });
};

const createWSLink = (headers) => {
  return new WebSocketLink(
    new SubscriptionClient(GRAPHQL_API_WS_URL, {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        return {
          headers: headers
        };
      }
    })
  );
};

const initClient = () => {
  const ssrMode = typeof window === 'undefined';
  let link;
  let headers: any = { 'x-hasura-role': 'user' };
  if (GRAPHQL_API_KEY) {
    headers = { 'x-hasura-admin-secret': GRAPHQL_API_KEY };
  }
  if (IS_DEV) {
    link = createHttpLink(headers);
  } else {
    if (ssrMode) {
      link = createHttpLink(headers);
    } else {
      link = createWSLink(headers);
    }
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore({})
    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: 'no-cache'
    //   },
    //   query: {
    //     fetchPolicy: 'no-cache'
    //   }
    // }
  });
};

const GraphqlApi = initClient();

export default GraphqlApi;
