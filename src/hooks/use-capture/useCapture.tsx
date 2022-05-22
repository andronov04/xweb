import React, { RefObject, useEffect } from 'react';
import {
  FILE_API_CAPTURE_URL,
  MOULDER_CMD_RESPONSE_CAPTURE,
  USE_COMPLETE_CAPTURE,
  USE_RESPONSE_ASSET_CAPTURE,
  USE_RESPONSE_CAPTURE,
  USE_RESPONSE_TOKEN_CAPTURE
} from '../../constants';
import { postFetch } from '../../api/RestApi';

interface ICapture {}

interface ICaptureSetupData {
  [key: string]: string | number | any;
}

interface ICaptureSetup {
  ref: RefObject<HTMLElement>;
  postData: ICaptureSetupData;
}

const createCapture = (props: ICapture, updater: () => void) => {
  // TODO Unmount addEventListener
  let _controlState = {
    loading: false,
    status: '',
    error: '',
    data: null
  };
  let init = false;
  let postData: null | ICaptureSetupData = null;

  const setState = (data = {}) => {
    Object.keys(data).forEach((key) => {
      _controlState[key] = data[key];
    });
    updater();
  };

  let refIframe: HTMLIFrameElement | null = null;
  const setup = (opts: ICaptureSetup) => {
    postData = opts.postData;
    if (opts.ref.current && !init) {
      refIframe = opts.ref.current as HTMLIFrameElement;
      init = true;

      let formats: any = [];

      window.addEventListener(
        'message',
        (event) => {
          // TODO Capture for token and asset
          // || event.data?.type === USE_RESPONSE_TOKEN_CAPTURE || event.data?.type === USE_RESPONSE_CAPTURE
          if (event.data?.type === MOULDER_CMD_RESPONSE_CAPTURE) {
            const capture = event.data.data.data;
            setState({ status: 'Uploading...' });
            const formData = new FormData();
            formData.append('file', event.data.data.data.blob);
            postFetch(FILE_API_CAPTURE_URL, formData)
              .then(async (response) => {
                const data = await response.json();
                formats.push({
                  mime: capture.mime,
                  format: capture.format,
                  ...data
                });
                if (formats.length === (capture.count ?? 1)) {
                  setState({ loading: false, status: '', data: formats });
                }
                // setState({ loading: false, status: '', data: { ...data, hash: event.data.data.data.hash } });
              })
              .catch((e) => {
                setState({ loading: false, status: '' });
              });
            //authHash: "nt7mj9Eruy6LYbhIrnQOR"
            // cid: "QmQ93DNpt1zHu6r4QfszmAyMLSkBnaGWrvVvVQKbqr9Kuj"
            // format: "png"
            // mime: "image/png"

            //blob: Blob {size: 9936, type: 'model/gltf-binary'}
            // count: 2
            // format: "glb"
            // mime: "model/gltf-binary"
            // order: 1
          }
        },
        false
      );
    }
  };

  const capture = () => {
    setState({ loading: true, status: 'Generate media...' });
    // get image and capture
    if (!postData) {
      setState({ loading: false, status: '', error: 'Unknown error.' });
      return;
    }
    // Post message and get blob
    refIframe?.contentWindow?.postMessage(postData, postData.url);
    // TODO Max wait
  };

  return {
    control: {
      _controlState
    },
    setup,
    capture
  };
};

interface ICaptureState {
  loading: boolean;
  status: string;
  error: string;
  data: any | null;
}

export const useCapture = (props: ICapture = {}) => {
  const _reference = React.useRef<any | undefined>();
  const [captureState, setCaptureState] = React.useState<ICaptureState>({
    loading: false,
    status: '',
    error: '',
    data: null
  });
  // loading, errors, message (loading)
  const control = _reference.current?.control;
  const callback = React.useCallback(() => {
    const newState = _reference.current.control._controlState;
    setCaptureState({ ...newState });
  }, [control]);

  useEffect(() => {
    return () => {
      // TODO Unmount addEventListener
    };
  }, []);

  if (!_reference.current) {
    _reference.current = {
      ...createCapture(props, callback),
      captureState
    };
  }

  _reference.current.captureState = { ...captureState, ...(control?._controlState ?? {}) };

  return _reference.current;
};
