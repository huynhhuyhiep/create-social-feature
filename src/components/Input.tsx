import {HTMLInputTypeAttribute, memo} from "react";
import {FieldValues, Path, UseFormRegister} from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  register?: UseFormRegister<T>
  name: Path<T>;
  required?: boolean;
  label?: string;
  error?: string;
  className?: string;
  type?: HTMLInputTypeAttribute
  value?: string;
}

function Input<T extends FieldValues>({label, register, name, required, error, ...rest}: InputProps<T>) {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input {...register?.(name, {required})}
             aria-invalid={error ? "true" : "false"}
             {...rest}
      />
      {error && <span role="alert">{error}</span>}
    </>
  );
}

export default memo(Input);
