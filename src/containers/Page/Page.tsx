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

  return (
    <div className={'p-10 w-full'}>
      <Header />

      <main id={'main'} className={'my-10 flex-grow w-full h-auto'}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
