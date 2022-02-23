import { FC, useEffect, useRef, useState } from "react";
import { useDebounce } from "../util/useDebounce";

interface IProps {
  [key: string]: unknown;
}

const Parent: FC<IProps> = (props) => {
  const countRef = useRef<number>(0);
  console.log(1111, countRef.current);
  const [value, setValue] = useState<string | number>(countRef.current);
  const debounceValue = useDebounce(value, 2000);
  console.log("debounceValue", debounceValue);
  useEffect(() => {
    console.log("发送远程请求....", debounceValue);
  }, [debounceValue]);

  const setFn = async () => {
    countRef.current++;
    console.log(countRef.current);
    await setValue(countRef.current);
    console.log("value", value);
  };
  return (
    <div className="test">
      <button onClick={setFn}>点击</button>
    </div>
  );
};

export default Parent;
