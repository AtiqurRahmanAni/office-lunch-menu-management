import { useField } from "formik";
import { Label, TextInput, Textarea } from "flowbite-react";

const Input = ({
  className,
  placeholder,
  fieldName,
  label,
  type = "text",
  disabled = false,
  textArea = false,
}) => {
  const [field, meta, _] = useField({ name: fieldName });
  return (
    <div className={className || ""}>
      <div className="mb-2 block">
        <Label htmlFor={fieldName} value={label} />
      </div>
      {!textArea ? (
        <TextInput
          type={type}
          id={fieldName}
          placeholder={placeholder}
          {...field}
          disabled={disabled}
        />
      ) : (
        <Textarea
          type={type}
          id={fieldName}
          placeholder={placeholder}
          {...field}
          disabled={disabled}
        />
      )}
      {meta.error && meta.touched && (
        <span className="font-medium text-red-400">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
