import {HTMLProps, memo} from "react";
import {useFormContext} from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  name: string;
}

function Checkbox({label, name, required, ...rest}: CheckboxProps) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <div>
      <input
        {...rest}
        {...register?.(name, {required})}
        aria-invalid={errors[name] ? "true" : "false"}
        type='checkbox'
      />
      {label && <label htmlFor={name}>{label}</label>}
      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(Checkbox);
