import React, { useRef, useState } from "react";
import classes from "./checkOut.module.css";

const Checkout = (props) => {
  const inputNameRef = useRef();
  const inputCityRef = useRef();
  const inputCodeRef = useRef();
  const inputStreetRef = useRef();
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    city: true,
    code: true,
    street: true,
  });
  const inputValid = (value) => value.trim() !== "";
  const confirmHandler = (event) => {
    event.preventDefault();
    const enterName = inputNameRef.current.value;
    const enterCity = inputCityRef.current.value;
    const enterCode = inputCodeRef.current.value;
    const enterStreet = inputStreetRef.current.value;

    const nameIsValid = inputValid(enterName);
    const cityIsValid = inputValid(enterCity);
    const StreetIsValid = inputValid(enterStreet);
    const codeIsValid = enterCode.trim().length === 6;

    setFormIsValid({
      name: nameIsValid,
      city: cityIsValid,
      code: codeIsValid,
      street: StreetIsValid,
    });
    console.log(nameIsValid);
    if (nameIsValid && cityIsValid && StreetIsValid && codeIsValid) {
      props.onConform({
        name: enterName,
        city: enterCity,
        code: enterCode,
        street: enterStreet,
      });
      console.log("Order");
      return;
    }
    console.log("not");
  };
  const nameClasses = formIsValid.name
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  const cityClasses = formIsValid.city
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  const StreetClasses = formIsValid.street
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  const codeClasses = formIsValid.code
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={inputNameRef} />
      </div>
      <div className={StreetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={inputStreetRef} />
      </div>
      <div className={codeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={inputCodeRef} />
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={inputCityRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
