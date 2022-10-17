import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

const SUCCESS_CODES = [200, 201, 204];

export const useRequest = <T extends Array<unknown>, R>(
  cb: (...params: T) => AxiosResponse<R>,
  {
    onSuccess,
    onFail,
    onStart,
  }: {
    onSuccess?: (res: AxiosResponse<R>, ...args: T) => void;
    onFail?: (res: AxiosResponse<R> | AxiosError, ...args: T) => void;
    onStart?: (...args: T) => void;
  } = {},
) => {
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const exec = async (...args: T) => {
    try {
      onStart?.(...args);
      setLoading(true);
      if (!cb) {
        setLoading(false);
        return;
      }
      const res: AxiosResponse<R> = await cb(...args);
      if (SUCCESS_CODES.includes(res.status)) {
        onSuccess?.(res as AxiosResponse<R>, ...args);
      } else {
        onFail?.(res as AxiosResponse<R>, ...args);
      }
      setLoading(false);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
      onFail?.(err as AxiosError, ...args);
      setLoading(false);
      setIsFailed(true);
    }
  };

  return { exec, isFailed, loading };
};
