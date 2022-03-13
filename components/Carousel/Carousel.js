import clsx from "clsx";

import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { useRef, useState } from "react";
import Painting from "components/PaintingV2";

const Carousel = ({ paintings = [], filterTag = "" }) => {
  const wrapper = useRef();

  const [stepLeftDisabled, setStepLeftDisabled] = useState(true);

  const [stepRightDisabled, setStepRightDisabled] = useState(false);

  const handleStepLeft = () => {
    wrapper.current.scrollTo({
      left: wrapper.current.scrollLeft - wrapper.current.children[0].clientWidth,
      behavior: "smooth",
    });
  };

  const handleStepRight = () => {
    wrapper.current.scrollTo({
      left: wrapper.current.scrollLeft + wrapper.current.children[0].clientWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = (e) => {
    setStepLeftDisabled(e.target.scrollLeft === 0);
    setStepRightDisabled(e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth);
  };

  return (
    <div className="relative pl-4 lg:h-96 h-80">
      <div
        className={clsx(
          stepLeftDisabled && "hidden",
          "absolute top-0 bottom-0 left-4 z-20 flex items-center justify-center w-20 ",
        )}
      >
        <button
          className="p-2 rounded-sm shadow-2xl ring-1 ring-white bg-primary"
          onClick={handleStepLeft}
        >
          <BiLeftArrowAlt className="text-xl text-white" />
        </button>
      </div>

      <div
        className={clsx(
          "snap-x relative snap-mandatory flex space-x-4 w-full h-full overflow-x-scroll scroll-pl-6 scroll-ml-6 scrollbar-hidden",
        )}
        ref={wrapper}
        onScroll={handleScroll}
      >
        {paintings
          .filter((p) =>
            p.tags?.find((t) => t.value.toLowerCase() === filterTag || filterTag === ""),
          )
          .map((p, i) => (
            <Painting paintingData={p} filterTag={filterTag} index={i} key={i} />
          ))}
      </div>

      <div
        className={clsx(
          stepRightDisabled && "hidden",
          "absolute top-0 bottom-0 right-0 flex items-center justify-center w-20",
        )}
      >
        <button
          className="p-2 rounded-sm shadow-2xl ring-1 ring-white bg-primary"
          onClick={handleStepRight}
        >
          <BiRightArrowAlt className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
