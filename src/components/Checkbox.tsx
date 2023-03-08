import React, {HTMLProps, memo} from "react";
import {useFormContext} from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Label from "components/Label";

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
      <Label htmlFor={name} tw='ml-[12px]'>{label}</Label>
      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(Checkbox);
