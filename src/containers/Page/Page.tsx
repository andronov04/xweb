import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useStore } from '../../store';
import { useAsync } from 'react-async-hook';
import '../../api/ListenerApi';

export default function Page({ children }) {
  const initUser = useStore((state) => state.initUser);

  useAsync(async () => {
    await initUser();
  }, []);

  //  sm:mx-auto
  return (
    <div className={'p-10 pb-0 max-w-6xl mx-auto flex flex-col h-full'}>
      <Header />

      <main
        style={{
          minHeight: 'fit-content',
          height: 'auto'
        }}
        id={'main'}
        className={'my-10 flex-grow w-full h-full'}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
