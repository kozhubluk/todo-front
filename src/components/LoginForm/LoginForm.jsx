import { Field, Form, Formik } from 'formik';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormInput from '../FormWrapper/FormInput';
import FormButton from '../FormWrapper/FormButton';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validation/signupValidation';
import { useLoginMutation } from '../../redux/slices/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <FormWrapper title="Войти">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            try {
              const data = await login({
                username: values.email,
                password: values.password,
              }).unwrap();
              setErrorMessage(null);
              dispatch(setCredentials({ accessToken: data.accessToken }));
              navigate('/today');
            } catch (error) {
              setErrorMessage(error.data.message);
            }
          }}>
          {({ touched, isValid, values }) => (
            <Form>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <Field
                title="email"
                name="email"
                type="text"
                validate={validateEmail}
                component={FormInput}
                placeholder="Введите email-адерс..."
              />
              <Field
                title="Пароль"
                name="password"
                type="password"
                validate={validatePassword}
                component={FormInput}
                placeholder="Введите пароль"
              />

              <FormButton type="submit" disabled={!isValid || isLoading}>
                {isLoading ? <CircularProgress size="30px" color="inherit" /> : 'Войти'}
              </FormButton>
            </Form>
          )}
        </Formik>
      </FormWrapper>
      <div className="form-container__link">
        Еще нет аккаунта? Тогда <Link to="/signup">зарегистрируйтесь</Link>
      </div>
    </div>
  );
};

export default LoginForm;
