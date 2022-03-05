import React, { PropsWithChildren, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { WalletApi } from '../api/WalletApi';
import { IWalletUser } from '../types';

interface IZContext {
  user: IWalletUser | null;
  wallet: WalletApi | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const initialContext: IZContext = {
  user: null,
  wallet: null,
  connect: () => new Promise(() => false),
  disconnect: () => {
    /**/
  }
};

export const UserContext = React.createContext<IZContext>(initialContext);

export const ZProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [context, setContext] = useState<IZContext>(initialContext);

  // init context
  useAsync(async () => {
    const wallet = new WalletApi();

    const _initialContext: IZContext = {
      ...initialContext,
      wallet,
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

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};
