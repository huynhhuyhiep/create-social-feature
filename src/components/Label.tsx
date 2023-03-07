import {HTMLProps, memo, ReactNode} from "react";

export interface LabelProps extends HTMLProps<HTMLLabelElement> {
  children: ReactNode;
}

function Label({htmlFor, children, ...rest}: LabelProps) {
  if (!children) return null;

  return <label htmlFor={htmlFor} tw="text-gray-700" {...rest}>{children}</label>;
}

export default memo(Label);
