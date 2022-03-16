import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useContext, useEffect, useRef, useState } from 'react';
import { XContext } from '../../providers/XProvider';
import UploadFile from '../../components/UploadFile/UploadFile';
import { useRouter } from 'next/router';

const CreateStyle = () => {
  const xContext = useContext(XContext);
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
              xContext.asset?.initAsset(data.cid, data.requestHash);
            }
            router.replace('/create/asset/style/preview').then().catch();
          }}
        />
      </div>
    </section>
  );
};

export default CreateStyle;
