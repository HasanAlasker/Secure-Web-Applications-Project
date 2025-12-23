import React, { useEffect } from "react";
import "../App.css";
import { getAllUsers } from "../api/user";
import useApi from "../hooks/useApi";
import Nav from "../components/Nav";
import Card from "../components/Card";

export default function Admin() {
  const { data: users, request: fetchUsers, loading } = useApi(getAllUsers);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) console.log("fetching users...");

  const admins = users.filter((user) => user.role === "admin");
  const normalUsers = users.filter((user) => user.role === "user");

  const adminList = admins.map((user) => (
    <Card
      title={"Admin Info"}
      name={user.name}
      email={user.email}
      role={user.role}
      createdAt={user.createdAt}
    />
  ));
  const userList = normalUsers.map((user) => (
    <Card
      title={"User Info"}
      id={user._id}
      name={user.name}
      email={user.email}
      role={user.role}
      isDeleted={user.isDeleted}
      createdAt={user.createdAt}
    />
  ));

  return (
    <div>
      <Nav />
      <div className="screen">
        <h1>Admins: </h1>
        <h2>{adminList.length > 0 ? adminList : "There are no admins"}</h2>
        <br />
        <h1>Users: </h1>
        <h2>{userList.length > 0 ? userList : "There are no users"}</h2>
      </div>
    </div>
  );
}
