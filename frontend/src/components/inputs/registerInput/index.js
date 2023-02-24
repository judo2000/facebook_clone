import { useField, ErrorMessage } from 'formik';
import './style.css';
import { useMediaQuery } from 'react-responsive';

const RegisterInput = ({ placeholder, bottom, ...props }) => {
  const desktopView = useMediaQuery({
    query: '(min-width: 850px)',
  });
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView ? 'input_error input_error_desktop' : 'input_error'
          }
          style={{ transform: 'translateY(5px)' }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? 'error_arrow_right' : 'error_arrow_top'}
            ></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView ? 'input_error input_error_desktop' : 'input_error'
          }
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? 'error_arrow_right' : 'error_arrow_bottom'
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          // style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}
        ></i>
      )}
    </div>
  );
};

export default RegisterInput;
