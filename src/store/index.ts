import create from 'zustand';
import produce from 'immer';
import { IStore } from '../types/store';
import { EDITOR_URL, MESSAGE_GENERATE_NEW, MESSAGE_GET_DIGEST, USE_ADD_ASSET, USE_PREPARE, USE_REMOVE_ASSET, USE_SET_THEME } from '../constants';
import { nanoid } from 'nanoid';
import { getWallet } from '../api/WalletApi';
import { IUser } from '../types';
import { eventOnceWaitFor } from '../api/EventApi';

let tokenProxy;
export const useStore = create<IStore>((set, get) => ({
  asset: {
    cid: '',
    kind: null,
    requestHash: '',
    previews: [],
    hash: '',
    addPreview: (cid, hash) =>
      set(
        produce((state) => {
          state.asset.previews.push({ cid, hash });
          state.asset.hash = hash;
          // state.asset.previews = previews;
          // state.asset.hash = hash;
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
    previews: [],
    cid: '',
    addPreview: (cid, hash) =>
      set(
        produce((state) => {
          state.token.previews.push({ cid, hash });
        })
      ),
    setCid: (cid: string) =>
      set(
        produce((state) => {
          state.token.cid = cid;
        })
      ),
    prepare: async () => {
      // Get store and digest and hashes from assets;
      const token = get().token;
      const requestId = nanoid();
      tokenProxy?.postMessage(
        {
          type: USE_PREPARE,
          requestId,
          data: {}
        },
        EDITOR_URL
      );

      const result = await eventOnceWaitFor(requestId);

      set({ token: { ...token, digest: result.digest, state: result.state } });
    },
    addAsset: (asset) =>
      set(
        produce((state) => {
          state.token.assets.push(asset);
          tokenProxy?.postMessage(
            {
              type: USE_ADD_ASSET,
              data: asset
            },
            EDITOR_URL
          );
        })
      ),
    removeAsset: (asset) =>
      set(
        produce((state) => {
          const index = state.token.assets.findIndex((a) => a.id === asset.id);
          state.token.assets.splice(index, 1);
          tokenProxy?.postMessage(
            {
              type: USE_REMOVE_ASSET,
              data: {
                assetId: asset.id
              }
            },
            EDITOR_URL
          );
        })
      ),
    setProxy: (proxy) =>
      set(
        produce((state) => {
          tokenProxy = proxy;
        })
      ),
    emit: () => {
      window.addEventListener(
        'message',
        (event) => {
          if (event.data?.type === MESSAGE_GET_DIGEST) {
            set(
              produce((state) => {
                state.token.digest = event.data.data.digest;
              })
            );
          }
          // if (event.data?.type === USE_SET_THEME) {
          //   console.log('USE_SET_THEME', event.data)
          // }
        },
        false
      );
    },
    generate: () => {
      tokenProxy?.postMessage(
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
  disconnectUser: async () => {
    await getWallet().disconnect();

    set({ user: null });
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
