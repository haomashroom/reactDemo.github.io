import { useEventEmitter } from "ahooks";
import React, { useEffect, useRef, useState } from "react";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import Parent from "./components/Parent";
import QueryUser from "./components/Test";
import Test1, { Mychild } from "./components/Test1";
import Test2 from "./components/Test2";
console.log(111);
const queryClient = new QueryClient();
function App() {
  console.log("aaa");
  const inputEl = useRef<Mychild>(null);
  const event$ = useEventEmitter();
  const clickChildHandle = () => {
    setFlag(false);
    //console.log(inputEl.current);
    //inputEl.current?.childClick();
  };
  const [flag, setFlag] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={clickChildHandle}>点击儿子节点</button>
        <Parent name="大可诶"></Parent>
        {/* <QueryClientProvider client={queryClient}>
          <QueryUser />
        </QueryClientProvider> */}
        {flag && <Test1 ref={inputEl} event$={event$}></Test1>}
        <Test2 event$={event$}></Test2>
      </header>
    </div>
  );
}

export default App;
