import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import Painting from 'components/Painting';

const PaintingGrid = ({ paintings = [], filterTag = '' }) => {
  return (
    <div className={clsx('xl:columns-3 relative gap-4 px-4 snap-y')}>
      {paintings
        .sort((a, b) => a.title.localeCompare(b.title))
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
