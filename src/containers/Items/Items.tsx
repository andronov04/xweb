import Item from 'src/components/Item/Item';
import { IItem } from '../../types';

const Items = ({ items, price }: { items: IItem[]; price?: boolean }) => {
  return (
    <>
      <section className={'mt-10 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-cols-3 h-full gap-6 w-full'}>
        {items.map((item) => (
          <Item key={`${item.id}_${item.slug}`} price={price} item={item} />
        ))}
      </section>
    </>
  );
};

export default Items;
