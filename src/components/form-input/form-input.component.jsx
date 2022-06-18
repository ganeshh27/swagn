import "./form-input.styles.scss";

export const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
      {label && <label className='shrinkLabel'>{label}</label>}

      <input className='form-input' {...otherProps} />
    </div>
  );
};
