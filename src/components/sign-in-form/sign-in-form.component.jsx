import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  SignInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import { Button } from "../button/button.component";

const defaultFormFields = {
  // displayName: "",
  email: "",
  password: "",
  // confirmPassword: "",
};

export const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields = { ...defaultFormFields };
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    let response = await createUserDocumentFromAuth(user);
    console.log(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await SignInAuthUserWithEmailAndPassword(
        email,
        password
      );

      console.log("response ", response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password for email");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
        default:
          console.log("user login error", error);
      }
    }
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account? </h2>
      <h3>Sign in with email and password</h3>

      <form onSubmit={handleSubmit}>
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
        <div className='button-container'>
          <Button buttonType='inverted' type='submit'>
            Sign in
          </Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
