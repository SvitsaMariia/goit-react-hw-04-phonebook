import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    let currentValue = defaultValue;

    try {
      currentValue =
        JSON.parse(window.localStorage.getItem(key)) || defaultValue;
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  });

  return [state, setState];
};