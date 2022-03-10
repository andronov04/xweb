import '../styles/globals.css';
import { XProvider } from '../providers/XProvider';
import { ApolloProvider } from '@apollo/client';
import GraphqlApi from '../api/GraphqlApi';
import NextNProgress from 'nextjs-progressbar';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress color={'#fff'} height={2} />
      <ApolloProvider client={GraphqlApi}>
        <XProvider>
          <Component {...pageProps} />
        </XProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
