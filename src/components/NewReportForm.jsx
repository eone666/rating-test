import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import FirstStep from "./FormSteps/FirstStep";
import SecondStep from "./FormSteps/SecondStep";
import FinalStep from "./FormSteps/FinalStep";
import FormProgress from "./FormProgress";

const NewReportForm = ({ submitHandler }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [statusDict, setStatusDict] = useState([]);

  useEffect(() => {
    fetch("http://178.90.223.230:6132/home/GetStatus_JSON")
      .then((res) => res.json())
      .then((data) => setStatusDict(data))
      .catch((err) => console.log(err));
  }, []);

  const renderStep = (step, errors, touched, statusDict) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            errors={errors}
            touched={touched}
            statusDict={statusDict}
          />
        );
      case 1:
        return <SecondStep errors={errors} touched={touched} />;
      case 2:
        return <FinalStep errors={errors} />;
      default:
        return <FirstStep errors={errors} touched={touched} />;
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          info: "",
          date: "",
          status: "",
          remarkCategory: "",
          remarkDate: "",
          remarkInfo: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
          info: Yup.string(),
          date: Yup.date().required(),
          status: Yup.string().required(),
          remarkCategory: Yup.string(),
          remarkDate: Yup.string(),
          remarkInfo: Yup.string(),
        })}
        onSubmit={(values) => {
          // same shape as initial values
          submitHandler(values);
        }}
      >
        {({ errors, touched, handleSubmit, handleChange }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            onChange={handleChange}
          >
            <FormProgress errors={errors} currentStep={currentStep} />
            {renderStep(currentStep, errors, touched, statusDict)}
          </Form>
        )}
      </Formik>
      <div className="buttons mt-4 d-flex justify-content-between">
        <Button disabled={currentStep === 0} onClick={prevStep}>
          PrevStep
        </Button>
        <Button disabled={currentStep === 2} onClick={nextStep}>
          NextStep
        </Button>
      </div>
    </div>
  );
};

export default NewReportForm;
