import { useEffect, useState } from 'react';

type State<T> =
  | {
      isLoading: true;
      data?: T;
      error: undefined;
    }
  | {
      isLoading: false;
      data: T;
      error: undefined;
    }
  | {
      isLoading: false;
      data: undefined;
      error: { status: number };
    };

export function useFetchData<T>(
  url: string,
  { transform, waitFor = true, keepPreviousData }: any = {},
) {
  // Use single state to avoid unncessary re-renders
  const [state, setState] = useState({
    isLoading: true,
    data: undefined,
    error: undefined,
  } as State<T>);
  const updateState = (newState: State<T>) => setState((state) => ({ ...state, ...newState }));

  const fetchData = async () => {
    updateState({
      isLoading: true,
      data: keepPreviousData ? state.data : undefined,
      error: undefined,
    });
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      updateState({
        isLoading: false,
        data: transform != null ? transform(data) : data,
        error: undefined,
      });
    } else {
      updateState({ isLoading: false, error: { status: response.status }, data: undefined });
    }
  };

  useEffect(() => {
    if (waitFor) {
      fetchData();
    }
  }, [url, waitFor]);

  return { ...state, refetch: fetchData };
}
