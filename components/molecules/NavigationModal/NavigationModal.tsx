"use client"
import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import AnimatedLogo from "components/atoms/AnimatedLogo"
import { NavItems } from "constants/navigation"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import { AiOutlineClose } from "react-icons/ai"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
      bounce: 0.05,
      type: "spring",
    },
  },
}

const listItem = {
  hidden: { opacity: 0, y: -100 },
  show: { opacity: 1, y: 0 },
}

interface Modal {
  isOpen: boolean
  closeModal: () => void
}

const NavigationModal = ({ isOpen, closeModal }: Modal) => {
  const pathName = usePathname()

  const asPathWithSpacing = pathName?.replace(/\//g, "/") || ""
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="h-full min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          {/* <span
            className="inline-block h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span> */}

          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-75"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-75"
          >
            <motion.div
              className="inline-block w-full h-full overflow-y-scroll transition-all transform bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </Dialog.Title> */}
              <div className="flex justify-between p-4">
                <AnimatedLogo />
                <button
                  type="button"
                  className="absolute text-2xl top-4 right-4"
                  onClick={closeModal}
                >
                  <AiOutlineClose />
                </button>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid h-full gap-4 p-4"
              >
                {NavItems.map((item, i) => {
                  const isActive = asPathWithSpacing.includes(item.url)
                  return (
                    <Link
                      key={i}
                      href={item.url}
                      className={clsx(
                        "transition-all duration-75 w-full text-dark ring",
                        "text-7xl hover:text-white hover:bg-primary active:bg-primary "
                      )}
                    >
                      <div>
                        <strong className="h-full">{item.text}</strong>
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
