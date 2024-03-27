import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../table.css";

//This credential lists all the credentials in the database
function CredentialList() {
  const [dataArray, setDataArray] = useState([]);
  const [users, setUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const token = sessionStorage.getItem("token");

  //send request to the backend
  useEffect(() => {
    setIsLoading(true);
    fetch("/credentials/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: null,
    })
      .then((res) => res.json())
      .then((data) => {
        setDataArray(data);
        setUsers(data.length);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    /* This lists all the credentials in a users division and organizational unit */
    <div className="table-container">
      <h2>Credential Repository:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Organisational unit</th>
            <th>Division</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Spinner animation="border" variant="dark" />
          ) : (
            dataArray.map((data, i) => {
              return (
                <tr key={i}>
                  <td key={data.name}>{data.name}</td>
                  <td key={data.email}>{data.email}</td>
                  <td key={i + " Password"}>{data.password}</td>
                  <td key={data.org_unit}>{data.org_unit}</td>
                  <td key={data.division}>{data.division}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CredentialList;
