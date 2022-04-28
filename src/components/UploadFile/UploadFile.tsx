import { useEffect, useRef, useState } from 'react';
import { CachePolicies, useFetch } from 'use-http';
import { FILE_API_ASSET_URL } from '../../constants';
import { UploadFileError } from '../../types/error';
import { UploadAssetFileResponse } from '../../types/api';
import Loader from '../Utils/Loader';

interface IUploadFile {
  onSuccess: (data: UploadAssetFileResponse) => void;
  onError?: (e: any) => void;
  onStart?: () => void;
}

const UploadFile = ({ onSuccess, onError, onStart }: IUploadFile) => {
  const [active, setActive] = useState(false);
  const refInput = useRef<HTMLInputElement | null>(null);
  const { data, loading, error, post } = useFetch<UploadAssetFileResponse | UploadFileError>(FILE_API_ASSET_URL, { cachePolicy: CachePolicies.NO_CACHE });

  // TODO Handle error
  useEffect(() => {
    if (data) {
      onSuccess(data as UploadAssetFileResponse);
    }
  }, [data, onSuccess]);

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items.length) {
      setActive(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setActive(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    await handleFiles(files);
    setActive(false);
  };

  const handleFiles = async (files: FileList) => {
    onStart?.();
    // TODO Validation files
    if (files.length) {
      const data = new FormData();
      data.append('file', files[0]);
      await post(data);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader className={'mt-32'} />
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDrag}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onClick={() => {
            refInput.current?.click();
          }}
          className={`${active ? 'opacity-80' : ''} my-10 z-20 bg-white10 cursor-pointer hover:opacity-80 h-32 rounded-md flex justify-center items-center`}
        >
          <input
            ref={refInput}
            onChange={async (e) => {
              if (e.target.files) {
                await handleFiles(e.target.files);
              }
            }}
            className={'hidden'}
            accept={'application/zip,application/x-zip-compressed'}
            type={'file'}
            autoComplete={'off'}
          />
          <p className={'text-inactive font-normal text-lg'}>Drag and Drop your ZIP file here or click to upload</p>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
