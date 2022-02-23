import React, { memo, useState } from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};
interface User {
  id: number | string;
  name: string;
}

const QueryUser = () => {
  console.log("QueryUser组件刷新");
  const [useFlag, setUseFlag] = useState(false);
  const {
    data: users,
    status,
    refetch,
  } = useQuery(
    "users",
    async () => {
      const data = await fetchUsers();
      return data;
    },
    {
      //   enabled: false,
      initialData: [{ id: 123, name: "大可" }],
      staleTime: 2000,
    }
  );
  return (
    <div className="App">
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <div>
          {users.map((user: User) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </div>
      )}
      <button onClick={() => refetch()}>useFlag</button>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </div>
  );
};
export default memo(QueryUser);
