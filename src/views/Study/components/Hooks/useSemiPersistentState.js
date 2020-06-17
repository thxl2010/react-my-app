import React, { useEffect, useState } from 'react';

/**
 * ! React Custom Hooks
 *
 * We are following two conventions of React’s built-in hooks here.
 * First,the naming convention which puts the “use” prefix in front of every hook name;
 * Second, the returned values are returned as an array.
 */
export const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
