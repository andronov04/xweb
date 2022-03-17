import React, { useState } from 'react';
import { ContractCall, ContractRequestStatus, ContractUseCallReturn, ContractUseCallState } from '../../types/contract';

export function useContract<T>(contractCall: ContractCall<T>): ContractUseCallReturn<T> {
  const [state, setState] = useState<ContractUseCallState<T>>({
    status: ContractRequestStatus.NONE,
    loading: false,
    result: null
  });

  const call = (data: T) => {
    setState({ ...state, loading: true });

    contractCall(data, (status, tzData) => {
      console.log('contractCall', status, tzData);
      // setState({ ...state, status, hash: tzData?.hash });
      if (status === ContractRequestStatus.INJECTED) {
        setState({ ...state, status, result: tzData?.hash });
        // success
      } else if (status === ContractRequestStatus.ERROR) {
        // error
      } else if (status === ContractRequestStatus.WAITING_CONFIRMATION) {
        // wait
      } else if (status === ContractRequestStatus.CALLING) {
        // wait
      }
    });
  };

  return {
    state,
    call
  };
}
