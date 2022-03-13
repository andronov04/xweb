import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useContext, useEffect, useRef, useState } from 'react';
import { XContext } from '../../providers/XProvider';
import UploadFile from '../../components/UploadFile/UploadFile';

const CreateStyle = () => {
  const xContext = useContext(XContext);

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
        <UploadFile />
      </div>
    </section>
  );
};

export default CreateStyle;
