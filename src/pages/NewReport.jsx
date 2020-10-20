import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import NewReportForm from "../components/NewReportForm";

const NewReport = () => {
  const { id } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitHandler = (values) => {
    fetch("https://178.90.223.230:6132/home/SetData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        objId: id,
      }),
    }).finally(() => {
      setIsSubmitted(true);
    });
  };

  if (isSubmitted) return <Redirect to={`/reports/${id}`} />;

  return (
    <div>
      <h1>New report</h1>
      <NewReportForm submitHandler={submitHandler} />
    </div>
  );
};

export default NewReport;
