import UploadFile from '../../components/UploadFile/UploadFile';
import { useRouter } from 'next/router';
import { useStore } from '../../store';
import { setMsg } from '../../services/snackbar';
import Link from 'next/link';

const CreateAsset = () => {
  const asset = useStore((state) => state.asset);
  const router = useRouter();

  return (
    <section className={'h-full'}>
      <div>
        {!asset.cid && (
          <UploadFile
            onSuccess={(data) => {
              if (data.cid && data.requestHash) {
                setMsg({ autoClose: 1000, clear: true, title: 'Successfully uploaded.', kind: 'success' });
                asset.setAsset(data.cid, data.requestHash);
                router.replace('/upload/asset/preview').then().catch();
              }
            }}
            onError={(e) => {
              setMsg({ clear: true, title: 'Failed to fetch.', kind: 'error' });
            }}
            onStart={() => {
              setMsg({ autoClose: false, block: true, title: 'Uploading...', kind: 'info' });
            }}
          />
        )}
      </div>
      <div className={'text-inactive text-center'}>
        How to create your own asset?{' '}
        <Link href={'https://github.com/contter/moulder'}>
          <a className={'text-active cursor-pointer hover:opacity-80'} href={'https://github.com/contter/moulder'} target={'_blank'} rel={'noreferrer'}>
            Go to GitHub
          </a>
        </Link>
        <p className={'mt-8 text-sm text-whitegrey'}>
          At this moment asset creation is available with HTML/CSS/JS. <br />
          We are planning to add Figma, Unity and other third-party services integration, <br />
          as well as support of PNG, SVG and other formats in future versions of the platform.
        </p>
      </div>
    </section>
  );
};

export default CreateAsset;
