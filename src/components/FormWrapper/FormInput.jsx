const FormInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div className="form__input-wrapper">
    <div className="form__input-line">
      <label for={field.name}>{props.title}</label>
      <input autocomplete="off" {...field} {...props} />
    </div>
    {touched[field.name] && <div className="form__input-error">{errors[field.name]}</div>}
  </div>
);

export default FormInput;
