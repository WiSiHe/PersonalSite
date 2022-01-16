import clsx from 'clsx';
import { motion } from 'framer-motion';
import { imageBuilder } from 'lib/sanity';

import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 1,
    },
  },
};

const Painting = function ({ paintingData = {} }) {
  const { _id, image = {}, title = '', tags = [], slug: { current = '' } = {} } = paintingData;

  const salesTagObj = tags?.find(t => t.value === 'Buyable') || {};
  const { value = '' } = salesTagObj;
  const isForSales = value === 'Buyable';

  const linkString = `/painting/${current}`;

  // const imageProps = useNextSanityImage(configuredSanityClient, image, {
  //   enableBlurUp: false,
  //   blurUpImageWidth: 124,
  //   blurUpImageQuality: 40,
  //   blurUpAmount: 24,
  // });

  return (
    <motion.article
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      className={clsx(
        'relative w-full rounded-md overflow-hidden focus:outline-none group cursor-pointer focus-within:ring focus-within:ring-highlight focus-within:z-10',
        'col-span-2 md:col-span-1 lg:col-span-2',
        // !isShow && 'opacity-10',
      )}
      key={_id}
    >
      <Link href={linkString} passHref>
        <a>
          <div className={clsx('relative w-full h-[520px] xl:h-[720px]')}>
            <Image
              // {...imageProps}
              src={imageBuilder(image).width(600).height(800).quality(55).url()}
              layout="fill"
              objectFit="cover"
              alt={`painting: ${_id}`}
              className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover group-hover:scale-110 bg-gray-50 "
            />
          </div>
          {isForSales && (
            <div className="absolute p-2 text-xs rounded-sm top-4 left-4 bg-highlight">
              <strong>For Sale</strong>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center text-white transition-all duration-500 ease-in-out opacity-0 cursor-pointer bg-gradient-to-t from-dark font group-hover:opacity-100">
            <p>{title}</p>
          </div>
        </a>
      </Link>
    </motion.article>
  );
};

Painting.propTypes = {
  index: PropTypes.number,
  paintingData: PropTypes.shape({
    _id: PropTypes.any,
    image: PropTypes.object,
    tags: PropTypes.array,
    title: PropTypes.string,
  }),
};

export default Painting;
