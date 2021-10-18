import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ isOpen = false, closeModal, children }) => {
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
          <div className="fixed bottom-0 left-0 right-0 p-4 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg md:max-w-4xl md:mx-auto ">
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
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  closeModal: PropTypes.any,
  isOpen: PropTypes.any,
};

export default Modal;
