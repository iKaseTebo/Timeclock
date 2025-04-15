"use client";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Modal({
  open,
  children,
  onClose,
  className = "",
}: {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    const root = document.getElementById("modal");
    if (root) {
      setModalRoot(root);
    }
  }, []);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    console.log("Modal open:", open);
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }

    return () => modal.close();
  }, [open]);

  if (!isClient || !modalRoot) return null;

  return createPortal(
    <dialog
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-zinc-900 rounded-xl shadow-lg border border-white p-6 
                w-full max-w-md text-white z-50 ${className}`}
      ref={dialog}
      onClose={onClose}
    >
      {open ? children : null}
    </dialog>,
    modalRoot
  );
}

export default Modal;
