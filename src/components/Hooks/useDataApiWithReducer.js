import axios from 'axios';
import produce from 'immer';
import { useEffect, useReducer, useState } from 'react';

// ! 1. a reducer function outside of the components:
// A reducer function always receives state and action .
// Based on these two arguments, a reducer always returns a new state:
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

/**
 * [Here is a simple example of the difference that Immer could make in practice.](https://immerjs.github.io/immer/docs/example-reducer)
 */
const dataFetchImmerReducer = produce((draft, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      draft.isLoading = true;
      draft.isError = false;
      break;
    case 'FETCH_SUCCESS':
      draft.isLoading = false;
      draft.isError = false;
      draft.data = action.payload;
      console.log('FETCH_SUCCESS draft :', draft);
      break;
    case 'FETCH_FAILURE':
      draft.isLoading = false;
      draft.isError = true;
      break;
    default:
      throw new Error();
  }
});

const useDataApiWithReducer = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  // ! 2. The hook  useReducer
  // The hook  useReducer receives a reducer function and an initial state as arguments
  // and returns an array with two items.
  // The first item is the current state; the second item is the state updater function (also called dispatch function):
  // const [state, dispatch] = useReducer(dataFetchReducer, {
  const [state, dispatch] = useReducer(dataFetchImmerReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      // ! 3. the useReducer state updater function
      // dispatches an action for the reducer.
      // The action comes with a type and an optional payload:
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          console.error('FETCH_FAILURE error :', error);
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    // ! 如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它：
    // ! [需要清除的 effect](https://zh-hans.reactjs.org/docs/hooks-effect.html#%E9%9C%80%E8%A6%81%E6%B8%85%E9%99%A4%E7%9A%84-effect)
    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

export default useDataApiWithReducer;
