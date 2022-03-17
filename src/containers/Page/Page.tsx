import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SnackBar from '../SnackBar/SnackBar';

export default function Page({ children }) {
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
