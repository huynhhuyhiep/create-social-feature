import React, {HTMLProps, memo} from "react";
import {useFormContext} from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  name: string;
  error?: string;
  options: string[];
}

function RadioGroup({label, name, required, error, options, ...rest}: CheckboxProps) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        {options.map((option) => {
          return (
            <label key={option}>
              <input
                {...register(name)}
                type="radio"
                value={option}
              />
              {option}
            </label>
          )
        })}
      </div>
      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(RadioGroup);
