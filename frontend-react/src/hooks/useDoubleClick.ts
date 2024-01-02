import { RefObject, useEffect } from 'react';

export const useDoubleClick = (ref: RefObject<HTMLElement>, callback: VoidFunction) => {
  useEffect(() => {
    ref.current?.addEventListener('dblclick', callback);
    return () => {
      ref.current?.removeEventListener('dblclick', callback);
    };
  }, []);
};
