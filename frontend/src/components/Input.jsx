import { forwardRef } from "react";
import { useField } from "formik";

const Input = ({
  className,
  type = "text",
  placeholder,
  fieldName,
  label,
  disabled = false,
}) => {
  const [field, meta, _] = useField({ name: fieldName });
  return (
    <div className={className || ""}>
      <label htmlFor={fieldName} className="text-lg block">
        {label}
      </label>
      <input
        type={type}
        id={fieldName}
        name={fieldName}
        placeholder={placeholder}
        {...field}
        disabled={disabled}
        className="border border-gray-300 rounded-md w-full p-2"
      />
      {meta.error && meta.touched && (
        <span className="font-medium text-red-400">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
