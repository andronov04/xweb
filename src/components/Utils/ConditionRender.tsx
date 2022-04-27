import React, { useEffect, useState } from 'react';

export interface ConditionRenderProps {
  client?: boolean;
  server?: boolean;
  children: React.ReactElement;
}

const ConditionRender: React.FC<ConditionRenderProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted && props.client) {
    return null;
  }

  if (isMounted && props.server) {
    return null;
  }

  return props.children as React.ReactElement;
};

export default ConditionRender;
