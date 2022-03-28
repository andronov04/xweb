import { ipfsToUrl } from '../../utils';

const Avatar = ({ avatar_uri }: { avatar_uri: string }) => {
  return (
    <>
      <div
        style={{
          backgroundSize: 'cover',
          borderRadius: '21px',
          backgroundImage: `url(${ipfsToUrl(avatar_uri)})`
        }}
        className={'w-32 h-32 bg-black'}
      />
    </>
  );
};

export default Avatar;
