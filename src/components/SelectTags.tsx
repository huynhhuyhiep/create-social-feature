import React, {memo} from "react";
import {Controller, useFormContext} from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

export interface SelectTagsProps {
  name: string;
  error?: string;
  options: string[];
  description?: string;
  label?: string;
  required?: boolean;
}

function SelectTags({label, options, name, required, error, description}: SelectTagsProps) {
  const {control, register, formState: {errors}} = useFormContext();

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      {description && <div>{description}</div>}
      <Controller
        name={name}
        rules={{required}}
        control={control}
        render={({field: {onChange, onBlur, name, value = [], ref}}) => {
          return (
            <div>
              <div tw='flex space-x-[8px]'>
                {value?.map((item: string, index: number) =>
                  <div
                    key={`${item}-${index}`}
                    tw='bg-primary-50 text-purple py-[4px] pl-[14px] pr-[10px] font-[500] rounded-[16px]'
                  >
                    {item}
                    <button
                      tw='px-[7px]'
                      onClick={() => onChange(value.filter((option: string) => option !== item))}>
                      x
                    </button>
                  </div>
                )}
              </div>
              <div tw='space-x-[8px]'>
                {options
                  .filter(item => !value?.includes(item))
                  .map((item, index) =>
                    <button
                      onClick={() => onChange([...value, item])}
                      key={`${item}-${index}`}
                      tw='bg-gray-100 text-gray-700 px-[10px] py-[2px] rounded-[16px] font-[500]'>
                      {item}
                    </button>
                  )}
              </div>
            </div>
          )
        }}
      />
      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(SelectTags);
