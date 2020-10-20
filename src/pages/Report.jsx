import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import ReportsList from "../components/ReportsList";

const Report = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`http://178.90.223.230:6132/home/GetJournal_JSON?id=${id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err));
  }, [id]);
  return (
    <div className="report-page">
      <h1 className="mb-4">Reports</h1>
      {error ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : (
        <ReportsList data={data} />
      )}
    </div>
  );
};

export default Report;
