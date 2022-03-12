import clsx from "clsx";
import { imageBuilder } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
// import { BiRightArrowAlt } from "react-icons/bi";

import { motion } from "framer-motion";

const Carousel = ({ paintings = [], filterTag = "" }) => {
  return (
    <div
      className={clsx(
        "snap-x relative snap-mandatory flex space-x-4 w-full py-6 overflow-x-scroll scroll-pl-6 scroll-ml-6 scrollbar-hidden",
      )}
    >
      {paintings
        .filter((p) => p.tags?.find((t) => t.value.toLowerCase() === filterTag || filterTag === ""))
        .sort(() => Math.random() - 0.5)
        .map((p, i) => {
          const { _id, image = {}, title = "", tags = [], slug: { current = "" } = {} } = p;
          const paintingImage = imageBuilder(image).width(400).height(400).quality(45).url();

          const linkString = `/painting/${current}`;

          const salesTagObj = tags?.find((t) => t.value === "Buyable") || {};
          const { value = "" } = salesTagObj;
          const isForSales = value === "Buyable";
          return (
            <div
              className="relative flex items-center justify-center flex-shrink-0 overflow-hidden transition-all duration-1000 ease-in-out rounded group snap-start bg-amber-200 w-96 h-96"
              key={i}
            >
              <Link href={linkString} passHref>
                <a>
                  <Image
                    src={paintingImage}
                    layout="fill"
                    objectFit="cover"
                    alt={`painting: ${_id}`}
                    className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover group-hover:scale-110 bg-gray-50 "
                  />

                  <motion.div className="absolute inset-0 items-center justify-center hidden text-white bg-black bg-opacity-50 group-hover:flex">
                    <strong>{title}</strong>
                  </motion.div>

                  {isForSales && (
                    <div className="absolute flex items-center p-2 text-xs rounded-sm top-4 left-4 bg-highlight">
                      <div className="relative w-2 h-2 mr-2 bg-white rounded-full">
                        <span className="absolute inset-0 inline-flex w-full h-full bg-white rounded-full opacity-100 animate-ping"></span>
                      </div>
                      <strong>For sale</strong>
                    </div>
                  )}
                </a>
              </Link>
            </div>
          );
        })}
      {/* <div className="absolute top-0 bottom-0 z-20 flex items-center right-4">
        <button className="p-2 rounded-full bg-primary">
          <BiRightArrowAlt className="text-3xl text-white" />
        </button>
      </div> */}
    </div>
  );
};

export default Carousel;
