import React, { PropsWithChildren, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { WalletApi } from '../api/WalletApi';
import { IWalletUser } from '../types';
import { CreArt } from '../services/creart';

interface IXContext {
  user: IWalletUser | null;
  wallet: WalletApi | null;
  art: CreArt | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const initialContext: IXContext = {
  user: null,
  wallet: null,
  art: null,
  connect: () => new Promise(() => false),
  disconnect: () => {
    /**/
  }
};

export const XContext = React.createContext<IXContext>(initialContext);

export const XProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [context, setContext] = useState<IXContext>(initialContext);

  // init context
  useAsync(async () => {
    const wallet = new WalletApi();

    const _initialContext: IXContext = {
      ...initialContext,
      wallet,
      art: new CreArt(),
      connect: async () => {
        /**/
        const tzId = await wallet.connect();
        if (tzId) {
          const changeCtx = { ...context };
          changeCtx.user = {
            id: tzId
          };
          setContext(changeCtx);
        }
      }
    };

    // Check user in
    const tzId = await wallet.connectLocalStorage();
    console.log('tzId', tzId);

    if (tzId) {
      _initialContext.user = {
        id: tzId
      };
      // TODO Load from backend;
    }

    setContext(_initialContext);
  }, []);

  return <XContext.Provider value={context}>{children}</XContext.Provider>;
};
