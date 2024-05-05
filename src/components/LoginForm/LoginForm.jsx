import { Field, Form, Formik } from 'formik';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormInput from '../FormWrapper/FormInput';
import FormButton from '../FormWrapper/FormButton';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validation/signupValidation';

const LoginForm = () => {
  return (
    <div className="signup">
      <FormWrapper title="Войти">
        <Formik
          initialValues={{ username: '', name: '', password: '', confirmPassword: '' }}
          onSubmit={(values, { setSubmitting }) => {
            console.log('33');
          }}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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

              <FormButton type="submit" disabled={isSubmitting} value="Войти" />
            </Form>
          )}
        </Formik>
      </FormWrapper>
      <div className="signup__link">
        Еще нет аккаунта? Тогда <Link to="/signup">зарегистрируйтесь</Link>
      </div>
    </div>
  );
};

export default LoginForm;
