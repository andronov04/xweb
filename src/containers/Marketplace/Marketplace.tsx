import { QL_GET_OFFER_TOKENS } from '../../api/queries';
import Items from '../../components/Items/Items';

const Marketplace = () => {
  return (
    <main>
      <Items kind={'offer'} mode={'offer'} query={QL_GET_OFFER_TOKENS} />
    </main>
  );
};

export default Marketplace;
