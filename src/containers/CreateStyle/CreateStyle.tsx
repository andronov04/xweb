import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import UploadFile from '../../components/UploadFile/UploadFile';
import { useRouter } from 'next/router';
import { useStore } from '../../store';

const CreateStyle = () => {
  const asset = useStore((state) => state.asset);
  const router = useRouter();

  return (
    <section className={'h-full'}>
      <div className={'flex w-full justify-between items-center'}>
        <div className={'w-1/3'}>
          <Breadcrumbs
            navs={[
              {
                name: 'Assets',
                active: false
              },
              {
                name: 'Your Style',
                active: true
              },
              {
                name: 'Upload',
                active: false
              }
            ]}
          />
        </div>
      </div>

      <div>
        <UploadFile
          onSuccess={(data) => {
            if (data.cid && data.requestHash) {
              asset.setAsset(data.cid, data.requestHash, 'style');
              router.replace('/create/asset/style/preview').then().catch();
            }
          }}
        />
      </div>
    </section>
  );
};

export default CreateStyle;
