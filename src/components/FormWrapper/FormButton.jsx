const FormButton = (props) => {
  return (
    <button className="form__button" {...props}>
      {props.children}
    </button>
  );
};

export default FormButton;
