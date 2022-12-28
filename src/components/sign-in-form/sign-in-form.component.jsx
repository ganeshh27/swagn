import { useState } from 'react';
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  SignInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import { FormInput } from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import { Button } from '../button/button.component';
// import { userContext } from '../../contexts/user.context';
// import { getRedirectResult } from 'firebase/auth';

const defaultFormFields = {
  // displayName: "",
  email: '',
  password: '',
  // confirmPassword: "",
};

export const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;
  // const { setCurrentUser } = useContext(userContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields({ ...defaultFormFields });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    // console.log('user ', user);
    // let response = await createUserDocumentFromAuth(user);
    // setCurrentUser(user);
    // console.log('userdocumentauth', response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await SignInAuthUserWithEmailAndPassword(
        email,
        password
      );

      console.log('response user', user);
      // setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect Password for email');
          break;
        case 'auth/user-not-found':
          alert('User not found');
          break;
        default:
          console.log('user login error', error);
      }
    }
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account? </h2>
      <h3>Sign In</h3>

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
            SignIn With Google
          </Button>
        </div>
      </form>
    </div>
  );
};
