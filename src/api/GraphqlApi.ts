import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { GRAPHQL_API_KEY, GRAPHQL_API_URL, GRAPHQL_API_WS_URL } from '../constants';
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
  if (ssrMode) {
    link = createHttpLink({ 'x-hasura-admin-secret': GRAPHQL_API_KEY });
  } else {
    link = createWSLink({ 'x-hasura-admin-secret': GRAPHQL_API_KEY });
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore({})
  });
};

const GraphqlApi = initClient();

export default GraphqlApi;
