import { useBoolean, useMount, useRequest } from "ahooks";
import { resolve } from "dns";
import React, { forwardRef, memo, useImperativeHandle } from "react";
import restore from "../util/restore";
interface User {
  name: string;
  age: number;
}
export const store = restore({
  count: 0,
  inc: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.count++;
        resolve(store.count);
      }, 1000);
    });
  },
  // getList: [] as any,
});
function getUserInfo(name: string): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data;
      if (name === "大可") {
        data = { name: "小涛", age: 26 };
      } else {
        data = { name: "大可", age: 26 };
      }
      resolve(data);
    }, 1000);
  });
}
export interface Mychild {
  childClick: () => void;
}
const Test = (props: any, ref: React.Ref<Mychild>) => {
  const {
    data: userInfo,
    loading,
    run,
  } = useRequest(getUserInfo, {
    manual: true,
  });
  useImperativeHandle(ref, () => ({
    childClick: () => {
      clickHandle();
    },
  }));
  const [flag, { toggle }] = useBoolean(true);

  props.event$.useSubscription(() => {
    clickHandle();
  });
  const clickHandle = () => {
    let text = flag ? "大可" : "小涛";
    run(text);
    toggle();
  };
  const { count, inc } = store;
  // useMount(() => {
  //   store.getList.push(run);
  // });
  return (
    <>
      <button onClick={clickHandle}>点击1111</button>
      <button onClick={inc}>addCount{count}</button>
      {/* <button onClick={() => store.getList[0]?.("大可")}>test</button> */}
      {loading ? <div>loading...</div> : <div>Username: {userInfo?.name}</div>}
    </>
  );
};
export default memo(forwardRef(Test));
