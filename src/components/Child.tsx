import React, { FC, useEffect, useImperativeHandle, useState } from "react";
console.log(333);
export interface IParentProps {
  age: string | number;
}

export interface IListItem {
  id: number;
  time: string;
  [key: string]: any;
}
const Child = (props: IParentProps, ref: React.Ref<unknown> | undefined) => {
  console.log("ccc");
  const { age } = props;
  const [eat, setEat] = useState("fish");
  const [list, setList] = useState<string[]>([]);
  useImperativeHandle(ref, () => ({
    setList: setList,
  }));
  useEffect(() => {
    const arr = ["dake", "xiaotao", "liming"];
    setList(arr);
  }, [eat]);
  const handleClick = (food?: string) => {
    const myFood = food || "food!!";
    console.log("我要吃东西");
    setEat(myFood);
  };

  return (
    <div>
      {age}
      <div className="dake">{eat}</div>
      <button onClick={() => handleClick()}>我吃东西啊</button>
      {list.map((d) => {
        return <div key={d}>{d}</div>;
      })}
    </div>
  );
};

export default Child;
