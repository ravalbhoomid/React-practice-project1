import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUsers.module.css";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";
function AddUser(props) {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();
  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      return setError({
        title: "Invalid Input",
        message: "Enter valid name and age",
      });
    }
    if (+enteredUserAge < 1) {
      return setError({
        title: "Invalid Age",
        message: "Enter a valid age (age > 0)",
      });
    }
    props.onAddUser(enteredName, enteredUserAge);
    //console.log(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const [enteredUsername, setEnteredUsername] = useState("");
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const [enteredAge, setEnteredAge] = useState("");
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      <div />
      {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={enteredUsername}
            id="username"
            onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age(Years)</label>
          <input
            type="number"
            id="age"
            value={enteredAge}
            onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button>Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
