import { ipfsToUrl } from '../../utils';

const Avatar = ({ avatar_uri }: { avatar_uri: string }) => {
  return (
    <>
      <div
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${ipfsToUrl(avatar_uri)})`
        }}
        className={'w-32 h-32 rounded-full bg-black'}
      />
    </>
  );
};

export default Avatar;
