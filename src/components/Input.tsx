import React, {HTMLProps, memo, ReactNode} from "react";
import {useFormContext} from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";

export interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'prefix'> {
  name: string;
  prefix?: ReactNode;
}

function Input({label, name, required, prefix, ...rest}: InputProps) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>

      <div tw='space-x-[15px] flex items-center'>
        {prefix && <span>{prefix}</span>}
        <input
          tw='bg-white rounded-[4px] px-[12px] text-[16px] font-[600] leading-[40px]'
          {...rest}
          {...register?.(name, {required})}
          aria-invalid={errors[name] ? "true" : "false"}
        />
      </div>

      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(Input);
