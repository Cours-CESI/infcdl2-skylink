import {ReactNode} from "react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({isOpen, onClose, children}: IModalProps) => {
  if (!isOpen)
    return null;

  return (
      <div className={"w-full h-full absolute top-0 left-0 z-1500 backdrop-brightness-50"} onKeyDown={(e) => {
        if (e.key === "Escape")
          onClose();
      }} autoFocus>
        <div className={"h-full w-full flex justify-center items-center brightness-100"}>
          {children}
        </div>
      </div>
  )
}

export default Modal;