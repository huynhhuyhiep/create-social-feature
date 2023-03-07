import React, {HTMLProps, memo} from "react";
import {useFormContext} from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  name: string;
  error?: string;
}

function TextArea({label, name, required, error, ...rest}: TextAreaProps) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <div className='w-full'>
      {label && <label htmlFor={name} tw='text-[14px] text-gray-1'>{label}</label>}
      <textarea
        tw='w-full bg-white px-[14px] py-[12px] rounded-[8px] mt-[6px]'
        {...register?.(name, {required})}
        aria-invalid={error ? "true" : "false"}
        {...rest}
      />
      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(TextArea);
