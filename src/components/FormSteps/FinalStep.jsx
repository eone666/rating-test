import React from "react";
import { Alert, Button } from "react-bootstrap";

const FinalStep = ({ errors }) => {
  return (
    <>
      {Object.values(errors).map((e, i) => (
        <Alert key={i} variant="danger">
          {e}
        </Alert>
      ))}
      <Button type="submit">Submit</Button>
    </>
  );
};

export default FinalStep;
