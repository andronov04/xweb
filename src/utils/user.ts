export const parseTzProfile = (data: any) => {
  try {
    let pData: any = {};
    for (const item of data) {
      const itemData = JSON.parse(item[1]);
      if (itemData?.type?.includes('VerifiableCredential')) {
        if (itemData?.type?.includes('TwitterVerification')) {
          pData.twitter = itemData?.credentialSubject?.sameAs;
        }
        if (itemData?.type?.includes('BasicProfile') && itemData.credentialSubject.website) {
          const url = itemData.credentialSubject.website as string;
          pData.website = url.startsWith('http') ? url : `https://${url}`;
        }
      }
    }
    return pData;
  } catch {
    return null;
  }
};
