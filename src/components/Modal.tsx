import React, {memo, MouseEventHandler, ReactNode} from "react";
import Button from "@/components/Button";
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
  min-height: 18rem;
  padding: 14px;
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 0.25rem;
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

ReactModal.setAppElement('#modals')

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
        {title}
        {children}
        <Button onClick={onCancel}>Close</Button>
        <Button onClick={onOk}>Save</Button>
      </ReactModal>
    </>
  )
}

export default memo(Modal);
