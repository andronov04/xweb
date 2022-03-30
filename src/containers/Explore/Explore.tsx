import { QL_GET_TOKEN_ITEMS } from '../../api/queries';
import Items from '../../components/Items/Items';

const Explore = () => {
  return (
    <main>
      <Items kind={'token'} query={QL_GET_TOKEN_ITEMS} />
    </main>
  );
};

export default Explore;
