"use client"
import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import { NavItems } from "constants/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { FaHome } from "react-icons/fa"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      // staggerChildren: 0.2,
      // delayChildren: 0.2,
      // bounce: 0.05,
      type: "spring",
    },
  },
}

interface Modal {
  isOpen: boolean
  closeModal: () => void
}

const NavigationModal = ({ isOpen, closeModal }: Modal) => {
  const pathName = usePathname()

  const asPathWithSpacing = pathName?.replace(/\//g, "/") || ""

  const isHome = asPathWithSpacing === "/"
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="relative flex justify-end w-full h-full p-4">
          <Dialog.Overlay className="fixed inset-0 transition-all duration-200 bg-black opacity-30" />

          {/* <span
            className="inline-block h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span> */}

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-500"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100 "
            leave="transition-all ease-in-out duration-500"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <motion.div className="inline-block w-full h-full overflow-y-scroll transition-all transform bg-white shadow-xl top-4 bottom-4 right-4 lg:w-1/3 rounded-xl">
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white shadow ">
                <strong className="text-lg font-oswald">
                  <span className="text-primary">He</span>nrik{" "}
                  <span className="text-primary">Wi</span>
                  lhelm <span className="text-primary">Si</span>ssener
                </strong>
                <button
                  type="button"
                  className="p-2 text-2xl top-4 right-4 hover:bg-primary hover:text-white"
                  onClick={closeModal}
                >
                  <AiOutlineClose />
                </button>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col h-full gap-1 p-4 pb-10"
              >
                <Link
                  href="/"
                  className={clsx(
                    "text-4xl hover:text-white p-4 hover:bg-primary",
                    isHome ? "text-white bg-primary" : " border-b",
                  )}
                >
                  <div className="flex gap-2">
                    <FaHome />
                    <strong className="font-oswald">Home</strong>
                  </div>
                </Link>
                {NavItems.map((item, i) => {
                  // check if current url is active and but also check if the url is a parent of the current url
                  const isUrlActive = asPathWithSpacing.includes(item.url)

                  const { Icon } = item

                  return (
                    <Link
                      key={i}
                      href={item.url}
                      className={clsx(
                        "text-4xl relative hover:text-white w-full hover:bg-primary ",
                        isUrlActive ? "bg-primary text-white" : "border-b",
                      )}
                    >
                      <div className="inset-0 z-10 flex flex-col p-2 ">
                        <div className="flex items-center gap-2">
                          <Icon />
                          <strong className="font-oswald">{item.text}</strong>
                        </div>
                        <div className="flex flex-col gap-4 mt-2">
                          <i className="text-sm">{item.description}</i>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </motion.div>
            </motion.div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default NavigationModal
