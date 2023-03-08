import React, {memo} from "react";
import {Controller, useFormContext} from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Label from "components/Label";
import TextareaAutosize, {TextareaAutosizeProps} from 'react-textarea-autosize';

export interface TextAreaProps extends TextareaAutosizeProps {
  name: string;
  label?:string;
}

function TextArea({label, name, required, ...rest}: TextAreaProps) {
  const {control, formState: {errors}} = useFormContext();

  return (
    <div className='w-full'>
      <Label tw='text-[14px] text-gray-1'>{label}</Label>
      <Controller
        name={name}
        rules={{required}}
        control={control}
        render={({field: {onChange, onBlur, name, value, ref}}) => {
          return (
            <TextareaAutosize
              ref={ref}
              value={value}
              onChange={onChange}
              tw='w-full bg-white px-[14px] py-[12px] rounded-[8px] mt-[6px]'
              aria-invalid={errors[name] ? "true" : "false"}
              {...rest}
            />
          )
        }}
      />

      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(TextArea);
