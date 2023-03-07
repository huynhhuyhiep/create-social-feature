import React, {HTMLProps, memo} from "react";
import {useFormContext} from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  name: string;
}

function Input({label, name, required, ...rest}: InputProps) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...rest}
        {...register?.(name, {required})}
        aria-invalid={errors[name] ? "true" : "false"}
      />
      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(Input);
