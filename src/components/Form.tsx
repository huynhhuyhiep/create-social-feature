import React, {memo, ReactNode} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";

export interface FormProps<T extends FieldValues> {
  children: ReactNode
  onSubmit: SubmitHandler<T>
}

function Form<T extends FieldValues>({children, onSubmit}: FormProps<T>) {
  const {handleSubmit, register, formState: {errors}} = useForm<T>();

  const getErrorMessage = (name: string) => {
    if (errors?.[name]?.type === 'required') {
      return `This is required`
    }

    return ''
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
          const {name, label} = child.props;
          return name
            ? React.createElement(child.type, {
              ...{
                ...child.props,
                register,
                error: getErrorMessage(name),
                key: name
              }
            })
            : child;
        })
        : children}
    </form>
  );
}

export default memo(Form);
