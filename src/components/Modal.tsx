import React, {memo, MouseEventHandler, ReactNode} from "react";
import Button from "components/Button";
import ReactModal from "react-modal";
import styled from "@emotion/styled";

export interface ModalProps {
  title?: string,
  onOk?: MouseEventHandler<HTMLButtonElement>,
  onCancel?: MouseEventHandler<HTMLButtonElement>
  open: boolean;
  children: ReactNode
}

const ModalStyle = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
`;

const OverlayStyle = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #212b3277;
`;

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#modals');
function Modal({title, open, onOk, onCancel, children}: ModalProps) {
  return (
    <>
      <ReactModal
        isOpen={open}
        onRequestClose={onCancel}
        className="_"
        overlayClassName="_"
        contentElement={(props, children) => (
          <ModalStyle {...props}>{children}</ModalStyle>
        )}
        overlayElement={(props, contentElement) => (
          <OverlayStyle {...props}>{contentElement}</OverlayStyle>
        )}
      >
        <div tw='p-[20px] pb-[20px] text-[20px] font-bold text-gray-700 border-b border-solid'>
          {title}
        </div>
        <div tw='p-[20px] w-full h-full overflow-auto py-[20px]'>
          {children}
        </div>
        <div tw='flex justify-end items-center p-[20px] border-t border-solid space-x-[20px]'>
          <Button onClick={onCancel} tw='font-[600] py-[5px] bg-white text-gray-600'>Close</Button>
          <Button onClick={onOk} tw='font-[600] py-[5px]'>Save</Button>
        </div>
      </ReactModal>
    </>
  )
}

export default memo(Modal);
