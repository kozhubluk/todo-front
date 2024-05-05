import { Field, Form, Formik } from 'formik';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormInput from '../FormWrapper/FormInput';
import FormButton from '../FormWrapper/FormButton';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validation/signupValidation';

const LoginForm = () => {
  return (
    <div className="form-container">
      <FormWrapper title="Войти">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            console.log('33');
          }}>
          {({ errors, touched, isValid }) => (
            <Form>
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
                autocomplete="off"
                name="password"
                type="password"
                validate={validatePassword}
                component={FormInput}
                placeholder="Введите пароль"
              />

              <FormButton
                type="submit"
                disabled={!isValid || Object.keys(touched).length < 1}
                value="Войти"
              />
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
