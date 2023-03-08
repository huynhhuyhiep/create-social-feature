import React, {HTMLProps, memo, ReactNode} from "react";
import {useFormContext} from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Label from "components/Label";

export interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
  name: string;
  options: string[];
  label: ReactNode;
}

function RadioGroup({label, name, required, options}: CheckboxProps) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>

      <div tw='mt-[12px] space-x-[32px]'>
        {options.map((option) => {
          return (
            <label key={option} tw='text-gray-600 font-[400]'>
              <input
                {...register(name, {required})}
                type="radio"
                value={option}
              />
              <span tw='ml-[12px]'>{option}</span>
            </label>
          )
        })}
      </div>

      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(RadioGroup);
