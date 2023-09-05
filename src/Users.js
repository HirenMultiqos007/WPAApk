import React, { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";

const Users = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("online");
  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "result");
        setData(result);
        localStorage.setItem("users", JSON.stringify(result));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        let finaldata = localStorage.getItem("users");
        setData(JSON.parse(finaldata));
        setMode("offline");
      });
  }, []);

  return (
    <>
      <div>
        <div>
          {mode === "offline" && (
            <div>
              <Alert variant="warning">
                <Alert.Heading>You are in Offline mode</Alert.Heading>
              </Alert>
            </div>
          )}
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th> Id </th>
              <th> Name </th>
              <th> Email </th>
              <th>Address</th>
              <th>Hiren</th>

            </tr>
          </thead>
          <tbody>
            {data?.map((item) => {
              return (
                <tr>
                  <td>{item?.id}</td>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.address?.street}</td>
                  <td> Helloo </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Users;
