import '../styles/globals.css';
import { ZProvider } from '../providers/ZProvider';
import { ApolloProvider } from '@apollo/client';
import GraphqlApi from '../api/GraphqlApi';
import NextNProgress from 'nextjs-progressbar';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress color={'#fff'} height={2} />
      <ApolloProvider client={GraphqlApi}>
        <ZProvider>
          <Component {...pageProps} />
        </ZProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
