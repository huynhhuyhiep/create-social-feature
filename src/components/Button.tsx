import React, {ButtonHTMLAttributes, memo} from "react";
import tw, {css} from "twin.macro";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

function Button({...rest}: ButtonProps) {
  return (
    <button
      type='button'
      {...rest}
      css={css`
        ${tw`bg-yellow py-[12px] px-[24px] text-purple text-[16px]`}
      `}
    />
  );
}

export default memo(Button);
