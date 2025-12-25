import React, { useEffect } from "react";
import Nav from "../components/Nav";
import useApi from "../hooks/useApi";
import { getMe } from "../api/user";
import Card from "../components/Card";
import { useState } from "react";

export default function MyInfo() {
  const { data, request, loading, error } = useApi(getMe);

  useEffect(() => {
    request();
  }, [data]);


  return (
    <div>
      <Nav />
      <div className="screen">
        <Card
          name={data.name}
          email={data.email}
          createdAt={data.createdAt}
          id={data._id}
        />
      </div>
    </div>
  );
}
