import React, { FC, forwardRef, useEffect, useRef, useState } from "react";
import Child from "./Child";
console.log(222);
export interface IParentProps {
  name: string;
}
export interface CRef {
  setList: any;
}
const Parent1: FC<IParentProps> = (props) => {
  console.log("bbb");
  useEffect(() => {
    console.log("AAA");
  }, []);
  const cRef = useRef<CRef>();
  const { name } = props;
  const [curName, setCurName] = useState(name);
  const [age, setAge] = useState(18);
  const FChild = forwardRef(Child);
  const test = () => {
    console.log(cRef);
    const arr = ["刘琛", "李帅", "张涛"];
    cRef.current?.setList(arr);
  };

  return (
    <div>
      {curName}
      <button onClick={() => setAge(220)}>加年龄</button>
      <button onClick={() => test()}>test</button>
      <FChild ref={cRef} age={age}></FChild>
    </div>
  );
};

export default Parent1;
