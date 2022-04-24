import Subscription from '../Subscription/Subscription';
import { DocumentNode } from '@apollo/client/core';
import { SUB_ACTION_OP_HASH } from '../../api/subscription';
import { useEffect, useState } from 'react';
import { MAX_TZ_WAITING_TIMEOUT, TZKT_URL } from '../../constants';
import Link from 'next/link';

interface IWaiting {
  query?: DocumentNode;
  opHash: string;
  onSuccess: (action: any) => void;
  onError?: (msg: string) => void;
}

const Waiting = ({ query, opHash, onSuccess, onError }: IWaiting) => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const msg = `Could not find the confirmation after ${MAX_TZ_WAITING_TIMEOUT}s of search.`;
      setError(true);
      onError?.(msg);
    }, MAX_TZ_WAITING_TIMEOUT * 1000);
    return () => clearTimeout(timer);
  }, [onError]);

  return (
    <div style={{ zIndex: 100 }} className={'w-full h-full fixed top-0 left-0'}>
      <Subscription
        query={query ?? SUB_ACTION_OP_HASH}
        variables={{ opHash: opHash }}
        onComplete={(data) => {
          const action = data?.action?.[0];
          if (action) {
            onSuccess(action);
          }
        }}
      />

      <div className={'w-full h-full bg-black absolute z-10 opacity-60'} />
      <div className={'absolute z-20 w-full h-full flex justify-center items-center'}>
        <div className={'bg-blackopacity gap-y-10 text-center flex justify-center items-center flex-col rounded-2xl p-10 w-96 h-96'}>
          {error ? (
            <div className={'relative w-ful flex justify-center'}>
              <div style={{ width: '170px' }} className=" block relative w-72 h-16">
                <div className="absolute top-0 mt-1 w-10 h-10 rounded-full bg-red" />
                <div style={{ left: '64px' }} className="absolute top-0 mt-1 w-10 h-10 rounded-full bg-red" />
                <div style={{ left: '122px' }} className="absolute top-0 mt-1 w-10 h-10 rounded-full  bg-red" />
              </div>
            </div>
          ) : (
            <div className={'relative w-ful flex justify-center'}>
              <div style={{ width: '170px' }} className="lr-dots block relative w-72 h-16">
                <div className="absolute top-0 mt-1 w-10 h-10 rounded-full bg-white" />
                <div className="absolute top-0 mt-1 w-10 h-10 rounded-full bg-white" />
                <div className="absolute top-0 mt-1 w-10 h-10 rounded-full bg-white" />
                <div className="absolute top-0 mt-1 w-10 h-10 rounded-full bg-white" />
              </div>
            </div>
          )}

          {error ? (
            <div>
              <p className={'text-red'}>
                Could not find the{' '}
                <Link href={`${TZKT_URL}${opHash}`}>
                  <a target={'_blank'} rel={'noreferrer'} href={`${TZKT_URL}${opHash}`} className={'font-normal hover:opacity-80'}>
                    confirmation
                  </a>
                </Link>{' '}
                after {MAX_TZ_WAITING_TIMEOUT}s of search.
              </p>
              <p className={'text-inactive mt-3 text-sm'}>
                Contact us at{' '}
                <Link href={'mailto:support@contter.com'}>
                  <a className={'text-active hover:opacity-80'} href={'mailto:support@contter.com'}>
                    support@contter.com
                  </a>
                </Link>{' '}
                or <br />
                go to our{' '}
                <Link href={'https://discord.gg/jAdcbHAbQE'}>
                  <a className={'text-active hover:opacity-80'} target={'_blank'} rel={'noreferrer'} href={'https://discord.gg/jAdcbHAbQE'}>
                    discord server
                  </a>
                </Link>
                .
              </p>
              <p className={'mt-5'}>
                <Link href={'/'}>
                  <a href={'/'} className={'text-active hover:opacity-80'}>
                    Back to home
                  </a>
                </Link>
              </p>
            </div>
          ) : (
            <div>
              <p className={'text-active'}>
                Waiting for blockchain confirmation
                <br />
                This can sometimes take up to two-minutes
              </p>
              <p className={'text-inactive mt-3 text-sm'}>
                iI successful, you will be redirected to the result page. <br />
                Don `&apos;`t close the page. In case of failure, rule 21 (Terms of Service) comes into effect.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Waiting;
