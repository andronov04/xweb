import { QL_GET_OFFER_TOKENS } from '../../api/queries';
import Items from '../../components/Items/Items';

const Marketplace = () => {
  return (
    <main>
      <div className={'flex justify-end mb-5'}>
        <div>
          <p className={'italic text-whitegrey'}>Recently listed</p>
        </div>
      </div>
      <Items kind={'offer'} mode={'offer'} query={QL_GET_OFFER_TOKENS} variables={{ flag: 0, enabled: true }} />
    </main>
  );
};

export default Marketplace;
