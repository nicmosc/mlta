import { omitBy } from 'lodash';
import { useState } from 'react';

type UrlParamsObject = Record<string, string[] | string>;

export const useUrlParams = <T extends UrlParamsObject>(): {
  setUrlParams: (value: Partial<T>) => void;
  urlParamsObject: T;
} => {
  const [searchParams, setUrlParams] = useState(new URLSearchParams(window.location.search));

  const params = Object.fromEntries(searchParams);

  const setParamsFromObject = (newUrlParamsObject: Partial<T>) => {
    const newSearchParams = new URLSearchParams(
      // Typescript doesn't allow the value of the param to be `string[]`,
      // however this gets encoded just fine for our purposes
      // @ts-ignore
      omitBy({ ...params, ...newUrlParamsObject }, (v) => v == null),
    );
    const queryString = newSearchParams.toString();

    if (searchParams.toString() !== queryString) {
      setUrlParams(newSearchParams);
      window.history.pushState({}, '', '?' + queryString);
    }
  };

  return {
    setUrlParams: setParamsFromObject,
    urlParamsObject: params as T,
  };
};
