import { useRef, useState } from 'react';

const UploadFile = () => {
  const [active, setActive] = useState(false);
  const refInput = useRef<HTMLInputElement | null>(null);

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

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleFiles(files);
    setActive(false);
  };

  const handleFiles = (files: FileList) => {
    // TODO Validation files
    console.log('handleFiles:::', files);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDrag}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onClick={() => {
        refInput.current?.click();
      }}
      className={`${active ? 'opacity-80' : ''} my-10 z-20 bg-white10 cursor-pointer hover:opacity-80 h-32 rounded-sm flex justify-center items-center`}
    >
      <input
        ref={refInput}
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files);
          }
        }}
        className={'hidden'}
        accept={'application/zip,application/x-zip-compressed'}
        type={'file'}
        autoComplete={'off'}
      />
      <p className={'text-inactive font-thin text-sm'}>Drag and Drop your ZIP file here or click to upload</p>
    </div>
  );
};

export default UploadFile;
