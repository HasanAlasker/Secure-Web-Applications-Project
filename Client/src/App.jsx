import React, { useEffect } from "react";
import "./App.css";
import { getAllUsers } from "./api/user";
import useApi from "./hooks/useApi";

export default function App() {
  const { data: users, request: fetchUsers, loading } = useApi(getAllUsers);

  useEffect(() => {
    fetchUsers();
  }, []);
  
  if (loading) console.log("fetching users...");

  const admins = users.filter((user) => user.role === "admin");
  const normalUsers = users.filter((user) => user.role === "user");

  const adminList = admins.map((user) => <h1>{user.name}</h1>);
  const userList = normalUsers.map((user) => <h1>{user.name}</h1>);

  return (
    <>
      <h1>Admins: </h1>
      {adminList.length > 0 ? <div>{adminList}</div> : "There are no admins"}
      <br />
      <h1>Users: </h1>
      {userList.length > 0 ? <div>{userList}</div> : "There are no users"}
    </>
  );
}
