import { ipfsToUrl } from '../../utils';

const Avatar = ({ avatarUri, pure }: { avatarUri: string; pure?: boolean }) => {
  return (
    <>
      <div
        style={{
          backgroundSize: 'cover',
          borderRadius: '21px',
          backgroundImage: avatarUri ? `url(${pure ? avatarUri : ipfsToUrl(avatarUri)})` : '',
          backgroundColor: '#E7E7E7'
        }}
        className={'w-32 h-32 bg-black'}
      />
    </>
  );
};

export default Avatar;
