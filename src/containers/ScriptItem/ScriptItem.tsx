import { ipfsToUrl } from '../../utils';
import Spacing from '../../components/Spacing/Spacing';
import { IAsset } from '../../types';
import Link from 'next/link';
import CustomButton from '../../components/CustomButton/CustomButton';
import Navs from '../../components/Navs/Navs';
import ScriptArts from './ScriptArts';
import ConditionRender from 'src/components/Utils/ConditionRender';

const ScriptItem = ({ item }: { item: IAsset }) => {
  const user = item.user?.username ?? item.user?.id;
  return (
    <section>
      <div className={'flex w-full items-center md:flex-row flex-col gap-x-8'}>
        <div className={'flex-grow flex h-96 flex-col justify-between'}>
          <div>
            <div>
              <h1 className={'text-active text-2xl'}>{item.name}</h1>
              <p className={'text-inactive text-sm'}>
                {item.kind === 1 ? 'Style' : ''} by{' '}
                <Link href={`/@${user}`}>
                  <a className={'text-active hover:text-inactive'} href={`/@${user}`}>
                    @{user}
                  </a>
                </Link>
              </p>
              <p className={'text-inactive pt-8 font-light'}>{item.description}</p>
              <span className={'font-light text-sm text-white30 mt-3'}>{item.created ? new Date(item.created).toLocaleDateString('en-US') : null}</span>
            </div>
          </div>
          <div className={'flex justify-end text-right'}>
            <div>
              {/*{item.count_tokens ? (*/}
              {/*  <p className={'font-light pb-1 text-inactive text-sm'}>*/}
              {/*    {item.count_tokens} {(item.count_tokens || 0) <= 1 ? 'art' : 'arts'}*/}
              {/*  </p>*/}
              {/*) : null}*/}
              <CustomButton style={'white'} classNames={'bg-active text-dark hover:bg-inactive'} value={'Create token'} />
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${ipfsToUrl(item.metadata?.displayUri ?? '')})`
            }}
            className={'w-96 h-96 rounded-sm'}
          />
        </div>
      </div>

      <Spacing size={3} />

      <div>
        <Navs
          links={[
            { url: `/asset/${item.slug ?? item.id}`, displayName: 'recently created', pathname: '/asset/[id]' },
            { url: `/asset/${item.slug ?? item.id}/activity`, displayName: 'activity', startsWith: '/asset/[id]/activity' }
          ]}
        />
      </div>

      <Spacing size={1.2} />

      <ConditionRender client>
        <ScriptArts item={item} />
      </ConditionRender>
    </section>
  );
};

export default ScriptItem;
