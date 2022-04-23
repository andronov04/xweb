import UploadFile from '../../components/UploadFile/UploadFile';
import { useRouter } from 'next/router';
import { useStore } from '../../store';
import { setMsg } from '../../services/snackbar';

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
              // console.log('eee', e);
            }}
            onStart={() => {
              setMsg({ autoClose: false, block: true, title: 'Uploading...', kind: 'info' });
            }}
          />
        )}
      </div>
    </section>
  );
};

export default CreateAsset;
