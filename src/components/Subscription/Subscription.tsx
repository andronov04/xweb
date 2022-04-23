import { useSubscription } from '@apollo/client';
import { DocumentNode } from '@apollo/client/core';
import { useEffect } from 'react';

interface IVariable {
  [key: string]: string | number;
}

interface IItems {
  variables?: IVariable;
  query: DocumentNode;
  onComplete: (data: any) => void;
}

const Subscription = ({ variables, query, onComplete }: IItems) => {
  const { data, loading: loadingSub } = useSubscription(query, {
    variables: variables,
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    onComplete(data);
  }, [data, onComplete]);

  return <></>;
};

export default Subscription;
