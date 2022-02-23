import { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom";
declare type Store = Record<string, any>;

interface IObject {
  [key: string]: any;
}
const __DEV__ = process.env.NODE_ENV !== "production";
const notObj = (val: unknown) => {
  return Object.prototype.toString.call(val) !== "[object Object]";
};
export function isValidKey<T>(
  key: string | number | symbol,
  object: T
): key is keyof typeof object {
  return key in object;
}
const restore = <T extends Store>(store: T): T => {
  if (__DEV__ && notObj(store)) throw new Error("store should be an object");
  //存储Render函数，初始化
  const state: IObject = {};
  //存储更新函数
  const setter: IObject = {};
  Object.keys(store).forEach((key) => {
    const initValue = store[key];
    if (typeof initValue !== "function") {
      const listeners = new Set();
      setter[key] = listeners;
      //创建初始Render函数
      const Render = () => {
        const [value, setValue] = useState(initValue);
        useMemo(() => {
          listeners.add(setValue);
          return listeners;
        }, []);

        //组件销毁需要清理数据
        useEffect(() => {
          return () => {
            listeners.delete(setValue);
          };
        }, []);
        return value;
      };
      state[key] = Render;
    }
  });

  //创建代理对象
  return new Proxy(store, {
    get: function (_target, propKey: string) {
      try {
        return state[propKey]();
      } catch (e) {
        return store[propKey];
      }
    },
    set: function (_target, propKey: string, value: unknown) {
      if (value !== store[propKey]) {
        //更新操作
        const updater = () => {
          //TODO：这里需要再次指明Store类型?
          (store as Store)[propKey] = value;
          setter[propKey].forEach(function (setValue: React.Dispatch<any>) {
            return setValue(value);
          });
        };
        typeof ReactDOM.unstable_batchedUpdates === "function"
          ? ReactDOM.unstable_batchedUpdates(updater)
          : updater();
      }

      return true;
    },
  });
};
export default restore;
