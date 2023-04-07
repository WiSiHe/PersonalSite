import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"

// src/components/Modal.tsx
interface iModalProps {
  isOpen?: boolean
  closeModal: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen = false, closeModal, children }: iModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        key="modal"
        open={isOpen}
        className="fixed inset-0 z-20 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-dark opacity-80" />
          <div className="fixed bottom-0 left-0 right-0 p-4 overflow-hidden text-left align-middle transition-all transform bg-white md:max-w-4xl md:mx-auto ">
            <Dialog.Title
              as="h3"
              className="pb-2 text-lg font-medium text-center "
            >
              Select filter
            </Dialog.Title>
            {children}
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal