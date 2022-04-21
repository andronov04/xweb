import { ipfsToUrl } from '../../utils';

const Avatar = ({ avatarUri }: { avatarUri: string }) => {
  return (
    <>
      <div
        style={{
          backgroundSize: 'cover',
          borderRadius: '21px',
          backgroundImage: avatarUri ? `url(${ipfsToUrl(avatarUri)})` : ''
        }}
        className={'w-32 h-32 bg-black'}
      />
    </>
  );
};

export default Avatar;
