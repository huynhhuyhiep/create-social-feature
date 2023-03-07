import React, {memo} from "react";

export interface AppHeaderProps {

}

const MENU = [
  'Blog', 'Socials', 'Past Socials', 'Clubs', 'Contact'
]
const AppHeader = (props: AppHeaderProps) => {
  const {} = props;
  return (
    <div tw='flex justify-center items-center w-full'>
      <div tw='w-full max-w-[1200px] flex justify-between items-center'>
        <div><img src='/images/logo.png' alt={'logo'} width={200}/></div>
        <div tw='space-x-[48px]'>
          {MENU.map(item => {
            return (
              <button key={item} tw='text-gray-1'>
                {item}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(AppHeader);
