import React, {forwardRef, HTMLProps, memo, ReactNode, useImperativeHandle} from "react";
import {DeepPartial, FieldValues, FormProvider, useForm} from "react-hook-form";

export interface FormProps<T> extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit'> {
  children: ReactNode
  onSubmit: (data: T) => any | Promise<any>
  defaultValues: DeepPartial<T>
}

export type FormHandle = {
  reset: () => void,
}

function Form<T extends FieldValues>({
                                       defaultValues,
                                       children,
                                       onSubmit,
                                       ...rest
                                     }: FormProps<T>, ref: React.ForwardedRef<FormHandle>) {
  const methods = useForm<T>({defaultValues});

  useImperativeHandle(ref, () => ({
    reset() {
      methods.reset()
    }
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
}

export default memo(forwardRef(Form));
