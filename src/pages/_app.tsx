import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import GraphqlApi from '../api/GraphqlApi';
import NextNProgress from 'nextjs-progressbar';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress color={'#fff'} height={2} />
      <ApolloProvider client={GraphqlApi}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
};

export default App;
