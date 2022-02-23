import { useEffect } from "react";
import { useState } from "react";
export const useDebounce = <V>(value: V, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  console.log("进入函数", debounceValue);
  useEffect(() => {
    console.log(2222);
    const timer = setTimeout(() => {
      console.log(3333);
      setDebounceValue(value);
    }, delay);
    return () => {
      console.log(4444);
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
};
