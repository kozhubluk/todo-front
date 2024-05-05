import './Form.scss';

const FormWrapper = ({ title, children }) => {
  return (
    <div className="form">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default FormWrapper;
