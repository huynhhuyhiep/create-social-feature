import React, {HTMLProps, memo} from "react";
import {Path, useFormContext} from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  name: string;
  error?: string;
}

function TextArea({label, name, required, error, ...rest}: TextAreaProps) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea {...register?.(name, {required})}
                aria-invalid={error ? "true" : "false"}
                {...rest}
      />
      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(TextArea);
