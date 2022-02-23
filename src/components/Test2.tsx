import { useCreation } from "ahooks";
import { useState } from "react";
import { store } from "./Test1";
interface IObject {
  [key: string]: any;
}
const Test2 = (props: any) => {
  const { count } = store;
  const [num, setNum] = useState(0);
  const obj = useCreation(() => ({} as IObject), []);
  return (
    <div>
      Hello World!!!!{count}
      {num}
      <button
        onClick={() => {
          obj.name = "dake" + Date.now();
          setNum((c) => c + 1);
        }}
      >
        加数据啊{num}
      </button>
      <button
        onClick={() => {
          props.event$.emit();
        }}
      >
        减数据啊{num}
      </button>
    </div>
  );
};

export default Test2;
