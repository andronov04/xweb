import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Page({ children }) {
  return (
    <div className={'p-10 w-full'}>
      <Header />

      <main id={'main'} className={'my-20 flex-grow w-full h-auto'}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
