import {memo, ReactNode} from "react";

export interface ErrorMessageProps {
  children: ReactNode
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const {children} = props;
  return (
    <span role="alert" tw='text-red-500 mt-[5px]'>{children}</span>
  );
};

export default memo(ErrorMessage);
