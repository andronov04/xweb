import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SnackBar from '../SnackBar/SnackBar';
import { useStore } from '../../store';
import { useAsync } from 'react-async-hook';

export default function Page({ children }) {
  const initUser = useStore((state) => state.initUser);

  useAsync(async () => {
    await initUser();
  }, []);

  return (
    <div className={'p-10 w-full'}>
      <Header />
      <SnackBar />

      <main id={'main'} className={'my-20 flex-grow w-full h-auto'}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
