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
import { Link } from 'react-router-dom';

const SignupForm = () => {
  return (
    <div className="signup">
      <FormWrapper title="Зарегистрироваться">
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
                autocomplete="off"
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
                disabled={isSubmitting}
                value="Зарегистрироваться через Email"
              />
            </Form>
          )}
        </Formik>
      </FormWrapper>
      <div className="signup__link">
        Уже есть аккаунт? Тогда <Link to="/login">войдите</Link>
      </div>
    </div>
  );
};

export default SignupForm;
