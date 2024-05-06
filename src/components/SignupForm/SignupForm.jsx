import { Field, Form, Formik } from 'formik';
import './SignupForm.scss';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormInput from '../FormWrapper/FormInput';
import FormButton from '../FormWrapper/FormButton';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../../utils/validation/signupValidation';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../redux/slices/authApiSlice';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

const SignupForm = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <FormWrapper title="Зарегистрироваться">
        <Formik
          initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
          onSubmit={async (values) => {
            try {
              await signup({
                username: values.email,
                name: values.name,
                password: values.password,
                confirmPassword: values.confirmPassword,
              }).unwrap();
              setErrorMessage(null);
              navigate('/login');
            } catch (error) {
              setErrorMessage(error.data.message);
            }
          }}>
          {({ touched, values, isValid }) => (
            <Form>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <Field
                title="email"
                name="email"
                type="email"
                validate={validateEmail}
                component={FormInput}
                placeholder="Введите email-адерс..."
              />
              <Field
                title="Имя"
                name="name"
                type="text"
                validate={validateName}
                component={FormInput}
                placeholder="Введите имя..."
              />
              <Field
                title="Пароль"
                name="password"
                type="password"
                validate={validatePassword}
                component={FormInput}
                placeholder="Введите пароль"
              />
              <Field
                title="Подтвердите пароль"
                type="password"
                name="confirmPassword"
                validate={(value) => {
                  return validateConfirmPassword(values.password, value);
                }}
                component={FormInput}
                placeholder="Подтвердите пароль..."
              />
              <FormButton
                type="submit"
                disabled={!isValid || Object.keys(touched).length < 1 || isLoading}
                value="Зарегистрироваться через Email">
                {isLoading ? <CircularProgress size="30px" color="inherit" /> : 'Войти'}
              </FormButton>
            </Form>
          )}
        </Formik>
      </FormWrapper>
      <div className="form-container__link">
        Уже есть аккаунт? Тогда <Link to="/login">войдите</Link>
      </div>
    </div>
  );
};

export default SignupForm;
