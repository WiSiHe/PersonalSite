import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import Painting from 'components/Painting';

const PaintingGrid = ({ paintings = [], filterTag = '' }) => {
  return (
    <div
      className={clsx(
        'relative grid grid-cols-2 p-4 gap-4 auto-rows-min xl:grid-cols-6 items-start',
      )}
    >
      {paintings
        .filter(p => p.tags?.find(t => t.value.toLowerCase() === filterTag || filterTag === ''))
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
