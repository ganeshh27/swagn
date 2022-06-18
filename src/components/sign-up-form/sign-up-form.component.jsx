import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import { Button } from "./../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword, number } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields = { ...defaultFormFields };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, {
        displayName,
      });

      resetFormFields();
    } catch (error) {
      console.log("error ", error);
      if (error.code === "auth/email-already-in-use") {
        alert("User already Exists");
      } else {
        console.log("user creation error", error);
      }
    }
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account? </h2>
      <h3>Sign up with email and password</h3>

      <form onSubmit={handleSubmit}>
        <FormInput
          label='DisplayName'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />

        <FormInput
          label='Mobile'
          type='number'
          required
          onChange={handleChange}
          name='mobile'
          value={number}
        />
        <Button buttonType='inverted' type='submit'>
          Sign Up
        </Button>
      </form>
    </div>
  );
};
