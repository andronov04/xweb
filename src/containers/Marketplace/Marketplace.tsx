import { QL_GET_SALES_TOKENS } from '../../api/queries';
import Items from '../../components/Items/Items';

const Marketplace = () => {
  return (
    <main>
      <Items kind={'token'} query={QL_GET_SALES_TOKENS} />
    </main>
  );
};

export default Marketplace;
