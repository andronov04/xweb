import UploadFile from '../../components/UploadFile/UploadFile';
import { useRouter } from 'next/router';
import { setMsg } from '../../services/snackbar';
import Link from 'next/link';
import { useState } from 'react';

const CreateAsset = () => {
  const [active, setActive] = useState(false);
  const router = useRouter();

  return (
    <section className={'h-full'}>
      <div>
        <UploadFile
          onSuccess={(data) => {
            if (data.cid) {
              setMsg({ autoClose: 1000, clear: true, title: 'Successfully uploaded.', kind: 'success' });
              router.replace(`/upload/asset/preview?c=${data.cid}`).then().catch();
            }
          }}
          onError={(e) => {
            setActive(false);
            setMsg({ clear: true, title: 'Failed to fetch.', kind: 'error' });
          }}
          onStart={() => {
            setActive(true);
            setMsg({ autoClose: false, block: true, title: 'Uploading...', kind: 'info' });
          }}
        />
      </div>
      {!active ? (
        <div className={'text-lg text-inactive text-center'}>
          How to create your own asset?{' '}
          <Link href={'https://github.com/contter/moulder'}>
            <a className={'text-active cursor-pointer hover:opacity-80'} href={'https://github.com/contter/moulder'} target={'_blank'} rel={'noreferrer'}>
              Go to GitHub
            </a>
          </Link>
          <p className={'text-base mt-8 text-sm text-whitegrey'}>
            At this moment asset creation is available with HTML/CSS/JS. <br />
            We are planning to add Figma, Unity and other third-party services integration, <br />
            as well as support of PNG, SVG and other formats in future versions of the platform.
          </p>
        </div>
      ) : null}
    </section>
  );
};

export default CreateAsset;
