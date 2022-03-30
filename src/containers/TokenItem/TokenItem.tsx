import Link from 'next/link';
import { IToken } from '../../types';
import { ipfsToUrl } from '../../utils';
import CustomButton from '../../components/CustomButton/CustomButton';
import Spacing from '../../components/Spacing/Spacing';
import Navs from 'src/components/Navs/Navs';

const TokenItem = ({ item }: { item: IToken }) => {
  const user = item.user?.username ?? item.user?.id;
  return (
    <section>
      <div className={'flex w-full items-start md:flex-row flex-col gap-x-8'}>
        <div>
          <div
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${ipfsToUrl(item.metadata?.displayUri ?? '')})`
            }}
            className={'w-96 h-96 rounded-sm'}
          />
        </div>
        <div className={'flex-grow'}>
          <div>
            <h1 className={'text-active text-2xl'}>{item.name}</h1>
            <p className={'text-inactive text-sm'}>
              Token by{' '}
              <Link href={`/@${user}`}>
                <a className={'text-active hover:text-inactive'} href={`/@${user}`}>
                  @{user}
                </a>
              </Link>
            </p>
            <p className={'text-inactive pt-8 font-light'}>{item.description}</p>
          </div>
          {/*<div className={'mt-10 flex font-light justify-end'}>*/}
          {/*  <Link href={`/style/${item.asset?.slug ?? item.asset?.id}`}>*/}
          {/*    <a href={`/style/${item.asset?.slug ?? item.asset?.id}`}>*/}
          {/*      <div className={'flex gap-x-3 text-right'}>*/}
          {/*        <div>*/}
          {/*          <p className={'text-inactive text-xs'}>Using by style</p>*/}
          {/*          <h3 className={'text-active text-base'}>{item.asset?.name}</h3>*/}
          {/*        </div>*/}
          {/*        <div>*/}
          {/*          <div*/}
          {/*            style={{*/}
          {/*              backgroundSize: 'cover',*/}
          {/*              backgroundImage: `url(${ipfsToUrl(item.asset?.metadata?.displayUri ?? '')})`*/}
          {/*            }}*/}
          {/*            className={'w-24 h-24 rounded-sm'}*/}
          {/*          />*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </a>*/}
          {/*  </Link>*/}
          {/*</div>*/}
          <div className={'mt-10'}>{/*<CustomButton classNames={'bg-active text-dark hover:bg-inactive'} value={`purchase ${item.price} tez`} />*/}</div>
        </div>
      </div>

      <Spacing size={3} />

      <div>
        <Navs
          links={[
            { url: `/token/${item.slug ?? item.id}`, displayName: 'details', pathname: '/token/[id]' },
            { url: `/token/${item.slug ?? item.id}/activity`, displayName: 'activity', startsWith: '/token/[id]/activity' }
          ]}
        />
      </div>

      <Spacing size={1.2} />

      <div className={'flex gap-y-1 flex-col font-light text-inactive'}>
        <div className={'flex'}>
          <span className={'pr-1'}>Minted: </span>
          <span>{item.created ? new Date(item.created).toLocaleDateString('en-US') : null}</span>
        </div>
        {item.royalties !== undefined ? (
          <div className={'flex'}>
            <span className={'pr-1'}>Royalties: </span>
            <span>{item.royalties}%</span>
          </div>
        ) : null}
        {item.tags?.length ? (
          <div className={'flex'}>
            <span className={'pr-1'}>Tags: </span>
            <span className={'text-active'}>{item.tags.join(', ')}</span>
          </div>
        ) : null}
        {item.metadataUri && (
          <div className={'flex'}>
            <span className={'pr-1'}>Metadata: </span>
            <span>
              <Link href={'ff'}>
                <a target={'_blank'} rel={'noreferrer'} href={ipfsToUrl(item.metadataUri)} className={'text-active hover:text-inactive'}>
                  view on IPFS
                </a>
              </Link>
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default TokenItem;
