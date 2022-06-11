import create from 'zustand';
import en from 'javascript-time-ago/locale/en.json';
import TimeAgo from 'javascript-time-ago';
import { IStore } from '../types/store';
import { getWallet } from '../api/WalletApi';
import { IUser } from '../types';
import GraphqlApi from '../api/GraphqlApi';
import { QL_GET_USER_BY_ID } from '../api/queries';

const getUser = async (id: string) => {
  const { data } = await GraphqlApi.query({
    query: QL_GET_USER_BY_ID,
    variables: { id: id },
    errorPolicy: 'all'
  });
  return data?.user?.[0];
};

export const useStore = create<IStore>((set, get) => ({
  user: null,
  initUser: async () => {
    const tzId = await getWallet().connectLocalStorage();
    let user: IUser | null = null;
    if (tzId) {
      const _item = await getUser(tzId);
      user = {
        id: tzId,
        ...(_item ?? {})
      };
    }
    set({ user });
  },
  disconnectUser: async () => {
    await getWallet().disconnect();

    set({ user: null });
  },
  connectUser: async () => {
    const tzId = await getWallet().connect();
    let user: IUser | null = null;
    if (tzId) {
      const _item = await getUser(tzId);
      user = {
        id: tzId,
        ...(_item ?? {})
      };
    }
    set({ user });
  }
}));

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.state = useStore.getState();
  useStore.getState().initUser().then();

  TimeAgo.addDefaultLocale(en);
}
