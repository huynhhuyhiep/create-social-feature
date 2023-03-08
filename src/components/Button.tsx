import React, {ButtonHTMLAttributes, memo, useRef} from "react";
import tw, {css} from "twin.macro";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Using Milliseconds
   */
  throttleDuration?: number;
}

function Button({onClick, disabled, throttleDuration, ...rest}: ButtonProps) {
  const isWaiting = useRef(false);

  return (
    <button
      disabled={disabled}
      type='button'
      onClick={(e) => {
        if (isWaiting.current) {
          e.preventDefault();
          return;
        }

        onClick?.(e);

        if (!throttleDuration) return;

        isWaiting.current = true;
        setTimeout(() => {
          isWaiting.current = false;
        }, throttleDuration);
      }}
      {...rest}
      css={css`
        ${tw`bg-yellow py-[12px] px-[24px] text-purple text-[16px] rounded-[8px]`}
        ${disabled && tw`opacity-30`}
      `}
    />
  );
}

export default memo(Button);
