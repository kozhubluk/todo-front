const FormButton = (props) => {
  return (
    <button className="form__button" {...props}>
      {props.value}
    </button>
  );
};

export default FormButton;
