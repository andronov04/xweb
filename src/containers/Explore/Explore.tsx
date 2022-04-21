import { QL_GET_TOKEN_ITEMS } from '../../api/queries';
import Items from '../../components/Items/Items';

const Explore = () => {
  return (
    <main>
      <div className={'flex font-light justify-end mb-5'}>
        <div>
          <p className={'italic text-whitegrey'}>Recently minted</p>
        </div>
      </div>
      <Items kind={'token'} query={QL_GET_TOKEN_ITEMS} />
    </main>
  );
};

export default Explore;
