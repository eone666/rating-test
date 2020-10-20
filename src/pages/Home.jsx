import React, { useState, useEffect } from "react";
import ObjectsList from "../components/ObjectsList";
import { Alert } from "react-bootstrap";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://178.90.223.230:6132/home/GetObj_JSON/")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err));
  }, []);

  return (
    <div className="home-page">
      <h1 className="mb-4">Registry</h1>
      {error ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : (
        <ObjectsList data={data} />
      )}
    </div>
  );
};

export default Home;
