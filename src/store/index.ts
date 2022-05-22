import create from 'zustand';
import produce from 'immer';

import en from 'javascript-time-ago/locale/en.json';
import TimeAgo from 'javascript-time-ago';

import { IStore } from '../types/store';
import {
  EDITOR_URL,
  FILE_API_CAPTURE_URL,
  FILE_API_STATE_URL,
  IPFS_PREFIX_URL,
  MESSAGE_GENERATE_NEW,
  MOULDER_CMD_ADD_ASSET,
  MOULDER_CMD_REMOVE_ASSET,
  MOULDER_CMD_REQUEST_CAPTURE,
  MOULDER_CMD_RESPONSE_CAPTURE,
  MOULDER_CMD_SET_CONF
} from '../constants';
import { nanoid } from 'nanoid';
import { getWallet } from '../api/WalletApi';
import { IUser } from '../types';
import { eventEmitter, eventOnceWaitFor } from '../api/EventApi';
import { postDataFetch, postFetch } from '../api/RestApi';
import GraphqlApi from '../api/GraphqlApi';
import { QL_GET_USER_BY_ID } from '../api/queries';
import { getExtByMime } from '../utils/mime';
import { waitUntil } from 'async-wait-until';

const getUser = async (id: string) => {
  const { data } = await GraphqlApi.query({
    query: QL_GET_USER_BY_ID,
    variables: { id: id },
    errorPolicy: 'all'
  });
  return data?.user?.[0];
};

let tokenProxy;
export const useStore = create<IStore>((set, get) => ({
  asset: {
    cid: '',
    authHash: '',
    previews: [],
    hash: '',
    addPreview: (data) =>
      set(
        produce((state) => {
          state.asset.previews = data;
          // state.asset.hash = hash;
          // state.asset.previews = previews;
          // state.asset.hash = hash;
        })
      ),
    setAsset: (cid: string, authHash: string) =>
      set(
        produce((state) => {
          state.asset.cid = cid;
          state.asset.authHash = authHash;
        })
      )
  },
  token: {
    assets: [],
    digest: '',
    previews: [],
    cid: '',
    isProxy: false,
    addPreview: (data) =>
      set(
        produce((state) => {
          state.token.previews = data;
        })
      ),
    setCid: (cid: string) =>
      set(
        produce((state) => {
          state.token.cid = cid;
        })
      ),
    prepare: async (snapshot: any) => {
      // Get store and digest and hashes from assets;
      const token = get().token;
      const asset = get().asset;
      // tokenProxy?.postMessage(
      //   {
      //     type: USE_PREPARE,
      //     requestId,
      //     data: {}
      //   },
      //   EDITOR_URL
      // );
      //
      // const result = await eventOnceWaitFor(requestId);

      // Get preview/capture
      // TODO Upload blob to server and set previews;
      let formats: any = [];
      let formatReady = false;
      eventEmitter.on(MOULDER_CMD_RESPONSE_CAPTURE, async (data) => {
        const capture = data.data;
        const formData = new FormData();
        formData.append('file', capture.blob, `${nanoid()}.${getExtByMime(capture.mime)}`);
        const response = await postFetch(FILE_API_CAPTURE_URL, formData);
        if (response.status !== 200) {
          throw 'Network error';
        }

        const resp = await response.json();
        formats.push({
          mime: capture.mime,
          format: capture.format,
          ...resp
        });
        if (formats.length === (capture.count ?? 1)) {
          formatReady = true;
        }
      });
      tokenProxy?.postMessage(
        {
          type: MOULDER_CMD_REQUEST_CAPTURE,
          data: {}
        },
        EDITOR_URL
      );

      // const data = await eventOnceWaitFor(MOULDER_CMD_RESPONSE_CAPTURE);

      const responseState = await postDataFetch(FILE_API_STATE_URL, snapshot);
      if (responseState.status !== 200) {
        throw 'Network error';
      }
      const respState = await responseState.json();

      await waitUntil(
        // Here, we specify a function that will be repeatedly called from time to time
        // Let's call this kind of function a `predicate`
        () => formatReady,
        // Here, we can specify a timeout in milliseconds. Once it passes,
        // we'll stop waiting and throw an exception
        { timeout: 60000 }
      );

      set({
        token: {
          ...token,
          digest: snapshot.digest,
          state: snapshot,
          stateCid: respState.cid,
          previews: formats
        },
        asset: {
          ...asset,
          previews: formats
        }
      });
    },
    addAsset: (asset) =>
      set(
        produce((state) => {
          if (state.token.assets.map((a) => a.id).includes(asset.id)) {
            return state;
          }
          const order = state.token.assets.length;
          state.token.assets.push(asset);
          const url = asset.metadata?.artifactUri; // 'http://localhost:3000/'; // asset.metadata?.artifactUri
          tokenProxy?.postMessage(
            {
              type: MOULDER_CMD_ADD_ASSET,
              data: {
                asset: {
                  id: asset.id,
                  name: asset.name,
                  order,
                  url
                }
              }
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
              type: MOULDER_CMD_REMOVE_ASSET,
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
          state.token.isProxy = true;

          // Set configuration
          tokenProxy?.postMessage(
            {
              type: MOULDER_CMD_SET_CONF,
              data: {
                conf: {
                  ipfsPrefix: IPFS_PREFIX_URL
                },
                target: 'all'
              }
            },
            EDITOR_URL
          );
        })
      ),
    emit: () => {
      //
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
