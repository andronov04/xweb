import create from 'zustand';
import produce from 'immer';
import { IStore } from '../types/store';
import { EDITOR_URL, MESSAGE_GENERATE_NEW, MESSAGE_GET_DIGEST } from '../constants';
import { nanoid } from 'nanoid';
import { getWallet } from '../api/WalletApi';
import { IUser } from '../types';

let artProxy;
export const useStore = create<IStore>((set, get) => ({
  asset: {
    cid: '',
    kind: null,
    requestHash: '',
    previews: [],
    hash: '',
    setPreview: (previews, hash) =>
      set(
        produce((state) => {
          state.asset.previews = previews;
          state.asset.hash = hash;
        })
      ),
    setAsset: (cid: string, requestHash: string, kind) =>
      set(
        produce((state) => {
          state.asset.cid = cid;
          state.asset.requestHash = requestHash;
          state.asset.kind = kind;
        })
      )
  },
  token: {
    assets: [],
    digest: '',
    setAssets: (assets) =>
      set(
        produce((state) => {
          state.art.assets = assets;
        })
      ),
    setProxy: (proxy) =>
      set(
        produce((state) => {
          artProxy = proxy;
        })
      ),
    emit: () => {
      window.addEventListener(
        'message',
        (event) => {
          if (event.data?.type === MESSAGE_GET_DIGEST) {
            set(
              produce((state) => {
                state.art.digest = event.data.data.digest;
              })
            );
          }
        },
        false
      );
    },
    generate: () => {
      artProxy?.postMessage(
        {
          type: MESSAGE_GENERATE_NEW,
          data: {
            requestId: nanoid()
          }
        },
        EDITOR_URL
      );
    }
  },

  message: null,
  setMessage: (message) => set((state) => ({ message })),

  user: null,
  initUser: async () => {
    const tzId = await getWallet().connectLocalStorage();
    let user: IUser | null = null;
    if (tzId) {
      user = {
        id: tzId
      };
    }
    set({ user });
  },
  connectUser: async () => {
    const tzId = await getWallet().connect();
    let user: IUser | null = null;
    if (tzId) {
      user = {
        id: tzId
      };
    }
    set({ user });
  }
}));

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.state = useStore.getState();
}
