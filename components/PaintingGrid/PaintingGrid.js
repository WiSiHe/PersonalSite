import clsx from 'clsx';
// import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
// import { useRecoilValue } from 'recoil';

// import ActiveLink from '../ActiveLink/ActiveLink';
// import { imageBuilder } from '../../lib/sanity';
// import { AnimatePresence, motion } from 'framer-motion';

// import { gridSize as atomGridSize } from "../../atoms/gridSize";
import Painting from 'components/Painting';

const PaintingGrid = ({ paintings = [], filterTag = '' }) => {
  // const gridSize = useRecoilValue(atomGridSize);

  // const list = {
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       when: "beforeChildren",
  //       staggerChildren: 0.1,
  //     },
  //   },
  //   hidden: {
  //     opacity: 0,
  //     transition: {
  //       when: "afterChildren",
  //     },
  //   },
  // };

  // const item = {
  //   visible: { opacity: 1, y: 0 },
  //   hidden: { opacity: 0, y: 50 },
  // };

  return (
    <div
      className={clsx(
        'relative grid grid-cols-2 px-4 gap-2 auto-rows-min xl:grid-cols-6 items-start',
      )}
    >
      {paintings
        // .sort((a, b) => a.title.localeCompare(b.title))
        .filter(p => p.tags?.find(t => t.value === filterTag || filterTag === ''))
        .map((p, i) => (
          <Painting paintingData={p} filterTag={filterTag} index={i} key={i} />
        ))}
    </div>
  );
};

PaintingGrid.propTypes = {
  display: PropTypes.bool,
  filterTag: PropTypes.string,
  paintings: PropTypes.array,
};

export default PaintingGrid;
