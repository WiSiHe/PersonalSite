import clsx from 'clsx';

import PropTypes from 'prop-types';
import React from 'react';
import { SiRedbubble } from 'react-icons/si';

const RedbubbleLink = ({ hasRedBubleLink, redbubbleUrl }) => {
  return (
    <>
      <a
        href={hasRedBubleLink ? redbubbleUrl : '#'}
        rel="noreferrer"
        target={redbubbleUrl && '_blank'}
        aria-label="redbubble"
      >
        <button
          className={clsx(
            'flex items-center justify-center w-full p-2 mt-4 border border-none  bg-[#e31421]',
            hasRedBubleLink ? 'hover:opacity-90' : 'opacity-30 cursor-not-allowed',
          )}
          disabled
        >
          <SiRedbubble className="mr-2 text-bright" />
          <strong className="text-bright">Redbubble store</strong>
        </button>
      </a>
    </>
  );
};

RedbubbleLink.propTypes = {
  hasRedBubleLink: PropTypes.any,
  redbubbleUrl: PropTypes.string,
};

export default RedbubbleLink;
