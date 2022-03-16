import React, { RefObject, useEffect } from 'react';
import { FILE_API_CAPTURE_IMG_URL, MESSAGE_GET_CAPTURE_IMG, MESSAGE_GET_DIGEST } from '../../constants';
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
  console.log('captureControl');
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

      window.addEventListener(
        'message',
        (event) => {
          if (event.data?.type === MESSAGE_GET_CAPTURE_IMG) {
            console.log('MESSAGE_GET_CAPTURE_IMG', event.data);
            setState({ status: 'Upload image to ipfs...' });
            const formData = new FormData();
            formData.append('file', event.data.data.blob);
            postFetch(FILE_API_CAPTURE_IMG_URL, formData)
              .then(async (response) => {
                const data = await response.json();
                setState({ loading: false, status: '', data: { ...data, hash: event.data.data.hash } });
              })
              .catch((e) => {
                console.log('error', e);
                setState({ loading: false, status: '' });
              });
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
    // console.log('upd', newState);
    setCaptureState({ ...newState });
  }, [control]);

  useEffect(() => {
    return () => {
      // TODO Unmount addEventListener
      console.log('unmount');
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
