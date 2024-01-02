import { useState } from 'react';
import urlJoin from 'url-join';

type State =
  | {
      isLoading: true;
      error: undefined;
    }
  | {
      isLoading: false;
      error: undefined;
    }
  | {
      isLoading: false;
      error: { status: number };
    };

export function useMutateData<T, K>(url: string) {
  // Use single state to avoid unncessary re-renders
  const [state, setState] = useState({
    isLoading: true,
    error: undefined,
  } as State);
  const updateState = (newState: State) => setState((state) => ({ ...state, ...newState }));

  const mutate = async ({
    method,
    body,
    params = '',
  }: {
    method: 'post' | 'put' | 'delete';
    body?: T;
    params?: string;
  }): Promise<State & { data?: K }> => {
    const response = await fetch(urlJoin(url, params), {
      method,
      body: body && JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      const state = {
        isLoading: false,
        error: undefined,
      };
      updateState(state);
      return { ...state, data };
    } else {
      const state = {
        isLoading: false,
        error: { status: response.status, message: await response.json() },
      };
      updateState(state as State);
      return { ...state, data: undefined } as State & { data: undefined };
    }
  };

  return {
    ...state,
    mutate,
  };
}
