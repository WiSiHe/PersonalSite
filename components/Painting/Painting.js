import clsx from 'clsx';
// import { configuredSanityClient } from 'helpers/sanityHelpers';
import { imageBuilder } from 'lib/sanity';

// import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const Painting = function ({ paintingData = {}, filterTag }) {
  const { _id, image = {}, title = '', tags = [], slug: { current = '' } = {} } = paintingData;

  const isShow = tags?.find(t => t.value === filterTag) || !filterTag;
  const linkString = `/painting/${current}`;

  // const isOddPanting = index % 2 === 0;

  // const imageProps = useNextSanityImage(configuredSanityClient, image, {
  //   enableBlurUp: false,
  //   blurUpImageWidth: 124,
  //   blurUpImageQuality: 40,
  //   blurUpAmount: 24,
  // });

  return (
    <article
      className={clsx(
        'relative w-full  focus:outline-none group cursor-pointer focus-within:ring focus-within:ring-highlight focus-within:z-10',
        'col-span-2 md:col-span-1 lg:col-span-2',
        !isShow && 'opacity-10',
        // isOddPanting ? 'h-[600px]' : 'h-[650px]',
        // isOddPanting
        //   ? 'col-span-full lg:row-span-4 lg:col-span-4'
        //   : 'col-span-full lg:row-span-1 lg:col-span-2',
      )}
      key={_id}
    >
      <Link href={linkString} passHref>
        <a>
          <div className="relative w-full h-[600px] xl:h-[720px]">
            <Image
              // {...imageProps}
              src={imageBuilder(image).width(600).height(800).quality(55).url()}
              layout="fill"
              // objectFit="cover"
              alt={`painting: ${_id}`}
              className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover hover:scale-110 bg-gray-50 "
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-4 text-white transition-all duration-500 ease-in-out opacity-0 cursor-pointer bg-gradient-to-t from-dark font group-hover:opacity-100">
            <p>{title}</p>
          </div>
        </a>
      </Link>
    </article>
  );
};

Painting.propTypes = {
  filterTag: PropTypes.any,
  index: PropTypes.number,
  paintingData: PropTypes.shape({
    _id: PropTypes.any,
    image: PropTypes.object,
    tags: PropTypes.array,
    title: PropTypes.string,
  }),
};

export default Painting;
