import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import { useRecoilState } from 'recoil';

// import { BsFilterRight } from 'react-icons/bs';
// import { BsGrid3X3Gap } from 'react-icons/bs';

// import Modal from 'components/Modal';

// import { gridSize as atomGridSize } from '../../atoms/gridSize';

const Filters = ({
  filteredTags = [],
  paintingsAmount = 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilterTag = () => {},
  activeFilter = '',
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [showControls, setShowControls] = useState(false);
  // const [stepLeftDisabled, setStepLeftDisabled] = useState(true);
  // const [stepRightDisabled, setStepRightDisabled] = useState(false);

  // function openModal() {
  //   setIsOpen(true);
  // }

  function selectFilter(filter) {
    // setIsOpen(false);
    setFilterTag(filter);
  }

  // function handleClose() {
  //   setIsOpen(false);
  // }

  const wrapper = useRef();

  // const handleResize = () => {
  //   if (!wrapper.current) return;
  //   setShowControls(wrapper.current.scrollWidth > wrapper.current.clientWidth);
  // };

  // const handleScroll = e => {
  //   setStepLeftDisabled(e.target.scrollLeft === 0);
  //   setStepRightDisabled(e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth);
  // };

  // useEffect(() => {
  //   if (!wrapper.current) return;

  //   // handleResize();
  //   window.addEventListener('resize', handleResize);

  //   wrapper.current.addEventListener('wheel', evt => {
  //     evt.preventDefault();
  //     wrapper.current.scrollLeft += evt.deltaX;
  //     wrapper.current.scrollLeft += evt.deltaY;
  //   });

  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <>
      <div className="overflow-hidden scrollbar-hidden">
        <div
          ref={wrapper}
          // onScroll={handleScroll}
          className="relative flex px-4 py-4 space-x-2 overflow-x-scroll scrollbar-hidden"
        >
          <button
            onClick={() => selectFilter('')}
            className={clsx(
              'p-2 text-xs bg-primary cursor-pointer whitespace-nowrap hover:opacity-90 rounded-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight',
              activeFilter === '' ? 'bg-yellow-400 hover:opacity-60 text-black' : 'text-white',
            )}
          >
            All ({paintingsAmount})
          </button>
          {filteredTags
            .sort((a, b) => b[1] - a[1])
            .map((tag, i) => {
              const label = tag[0];
              const amount = tag[1];
              return (
                <button
                  className={clsx(
                    'transition p-2 text-xs bg-primary whitespace-nowrap hover:opacity-90 rounded-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight',
                    activeFilter === label
                      ? 'bg-yellow-400 hover:bg-yellow-200 text-black'
                      : 'text-white ',
                  )}
                  key={i}
                  onClick={() => selectFilter(label)}
                >
                  <span className="capitalize">{label}</span> ({amount})
                </button>
              );
            })}
        </div>
      </div>
      {/* <Modal isOpen={isOpen} closeModal={() => handleClose()}>
        <div className="flex flex-col flex-wrap ">
          <button
            onClick={() => selectFilter("")}
            className={clsx(
              "p-2 text-xs  bg-primary cursor-pointer whitespace-nowrap hover:opacity-90 ",
              activeFilter === ""
                ? "bg-yellow-400 hover:opacity-60 text-black"
                : " text-white"
            )}
          >
            All ({paintingsAmount})
          </button>
          {filteredTags
            .sort((a, b) => b[1] - a[1])
            .map((tag, i) => {
              const label = tag[0];
              const amount = tag[1];
              return (
                <button
                  className={clsx(
                    "transition p-2 text-xs text-white bg-primary whitespace-nowrap hover:opacity-90",
                    activeFilter === label &&
                      "bg-yellow-400 hover:bg-yellow-200 text-black"
                  )}
                  key={i}
                  onClick={() => selectFilter(label)}
                >
                  <span className="capitalize">{label}</span> ({amount})
                </button>
              );
            })}
          <button
            className="w-2/4 mx-auto mt-4 border border-black ring"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </Modal> */}
    </>
  );
};

Filters.propTypes = {
  activeFilter: PropTypes.string,
  filteredTags: PropTypes.array,
  paintingsAmount: PropTypes.number,
  setFilterTag: PropTypes.func,
};

export default Filters;
