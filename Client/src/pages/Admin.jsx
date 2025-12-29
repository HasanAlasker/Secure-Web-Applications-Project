import React, { useEffect, useState } from "react";
import "../App.css";
import { deleteUser, getAllUsers, undeleteUser } from "../api/user";
import useApi from "../hooks/useApi";
import Nav from "../components/Nav";
import Card from "../components/Card";

export default function Admin() {
  const { data: users, request: fetchUsers, loading } = useApi(getAllUsers);
  const [usersArr, setUsersArr] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setUsersArr(users);
  }, [users]);

  if (loading) return <h2 className="loading">Loading users...</h2>;

  const handleDelete = async (name, id) => {
    setLoading(true);
    let text = `Are you sure you want to delete ${name} account?`;
    if (confirm(text) === true) {
      try {
        const result = await deleteUser(id);
        if (result.ok) {
          alert(`${name} account deleted successfully!`);

          setUsersArr((prev) => prev.filter((user) => user._id !== id));
        } else alert("Something went wrong!", err);
      } catch (err) {
        alert("Something went wrong!", err);
      }
    }
    setLoading(false);
  };

  const handleUnDelete = async (name, id) => {
    let text = `Are you sure you want to restore ${name} account?`;
    setLoading(true);
    if (confirm(text) === true) {
      try {
        const result = await undeleteUser(id);
        if (result.ok) {
          alert(`${name} account restored successfully!`);

          setUsersArr((prev) => prev.filter((user) => user._id !== id));
        } else alert("Something went wrong!", err);
      } catch (err) {
        alert("Something went wrong!", err);
      }
    }
    setLoading(false);
  };

  const admins = usersArr.filter((user) => user.role === "admin");
  const normalUsers = usersArr.filter((user) => user.role === "user");

  const adminList = admins.map((user) => (
    <Card
      key={user._id}
      title={"Admin Info"}
      name={user.name}
      email={user.email}
      role={user.role}
      createdAt={user.createdAt}
      isLoading={isLoading}
    />
  ));
  const userList = normalUsers.map((user) => (
    <Card
      key={user._id}
      title={"User Info"}
      id={user._id}
      name={user.name}
      email={user.email}
      role={user.role}
      isDeleted={user.isDeleted}
      createdAt={user.createdAt}
      handleDelete={() => handleDelete(user.name, user._id)}
      handleUnDelete={() => handleUnDelete(user.name, user._id)}
      isLoading={isLoading}
    />
  ));

  return (
    <div>
      <Nav />
      <div className="screen">
        <h1>Admins: {adminList.length}</h1>
        <h2>{adminList.length > 0 ? adminList : "There are no admins"}</h2>
        <br />
        <h1>Users: {normalUsers.length}</h1>
        <h2>{userList.length > 0 ? userList : "There are no users"}</h2>
      </div>
    </div>
  );
}
