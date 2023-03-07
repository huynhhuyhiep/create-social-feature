import {memo, ReactNode} from "react";
import tw, {css} from "twin.macro";

export interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

const ContentWrapper = ({children, ...rest}: ContentWrapperProps) => {
  return (
    <div css={css`
      ${tw`min-h-screen overflow-y-scroll flex justify-center pt-[22px]`}
      background: linear-gradient(138.11deg, #FEF452 0%, #942F70 121.92%);
    `}
         {...rest}
    >
      <div tw='max-w-[1200px] w-full'>
        {children}
      </div>
    </div>
  );
};

export default memo(ContentWrapper);
