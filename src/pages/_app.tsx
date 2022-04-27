import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import GraphqlApi from '../api/GraphqlApi';
import NextNProgress from 'nextjs-progressbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress color={'#fff'} height={2} />
      <ApolloProvider client={GraphqlApi}>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          // pauseOnVisibilityChange={true}
          closeOnClick={true}
          pauseOnHover={true}
        />
      </ApolloProvider>
    </>
  );
};

export default App;
