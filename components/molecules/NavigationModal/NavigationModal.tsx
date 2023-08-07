"use client"
import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import LogoQR from "components/atoms/icons/LogoQR"
import { NavItems } from "constants/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { FaLocationArrow } from "react-icons/fa"
import { cn } from "utils/utility"

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

// const listItem = {
//   hidden: { opacity: 0, y: -100 },
//   show: { opacity: 1, y: 0 },
// }

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
        className="fixed inset-0 z-20 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="h-full min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 transition-all duration-200 bg-black opacity-30" />

          {/* <span
            className="inline-block h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span> */}

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <motion.div
              className="inline-block w-full lg:w-[40vw] h-full shadow-xl overflow-y-scroll rounded-xl transition-all transform bg-white"
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
            >
              {/* <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </Dialog.Title> */}
              <div className="sticky top-0 z-10 flex justify-between p-4 bg-white shadow ">
                <LogoQR
                  className={(cn("transition-all ease-in-out"), "fill-dark")}
                  width="2.5rem"
                  height="2.5rem"
                />
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
                className="flex flex-col h-full gap-4 p-4"
              >
                <Link
                  href="/"
                  className={clsx(
                    "text-4xl lg:text-8xl hover:text-white p-4 hover:bg-primary",
                    isHome && "text-white bg-primary"
                  )}
                >
                  <strong className="">Home</strong>
                  {isHome && (
                    <div className="pl-1 text-sm">You are currently here!</div>
                  )}
                </Link>
                {NavItems.map((item, i) => {
                  // check if current url is active and but also check if the url is a parent of the current url
                  const isUrlActive = asPathWithSpacing.includes(item.url)

                  return (
                    <Link
                      key={i}
                      href={item.url}
                      className={clsx(
                        "text-4xl lg:text-8xl relative hover:text-white w-full hover:bg-primary",
                        isUrlActive && "text-white",
                        isUrlActive && "bg-primary"
                      )}
                    >
                      <div className="inset-0 z-10 flex flex-col p-4 ">
                        <strong>{item.text}</strong>
                        <div className="flex gap-4 mt-2">
                          <i className="text-sm">{item.description}</i>
                          {isUrlActive && (
                            <div className="flex items-center gap-2 text-sm">
                              <FaLocationArrow className="" />
                              You are currently here!
                            </div>
                          )}
                        </div>
                      </div>

                      {/* <div
                        className={clsx(
                          "h-24 lg:h-36 delay-150 rounded duration-500 z-0 w-0 transition-all group-hover:w-full",
                          isUrlActive
                            ? "group-hover:bg-primary/80 w-full  bg-primary"
                            : "bg-primary"
                        )}
                      /> */}
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
