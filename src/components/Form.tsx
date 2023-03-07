import React, {HTMLProps, memo, ReactNode} from "react";
import {FieldValues, FormProvider, useForm} from "react-hook-form";

export interface FormProps<T> extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit'> {
  children: ReactNode
  onSubmit: (data: T) => any | Promise<any>
}

function Form<T extends FieldValues>({children, onSubmit, ...rest}: FormProps<T>) {
  const methods = useForm<T>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
}

export default memo(Form);
