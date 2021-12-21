import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
// import dynamic from 'next/dynamic';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useNextSanityImage } from 'next-sanity-image';

// import { SiRedbubble, SiArtstation, SiInstagram, SiLinkedin } from 'react-icons/si';

// import useWindowDimensions from 'hooks/useWindowDimension';

import Meta from 'components/Meta';
import Main from 'components/Main';
import { configuredSanityClient } from 'helpers/sanityHelpers';
import Navigation from 'components/Navigation';
// import Link from 'next/link';
// import Logo from 'icons/logo';
// import SocialLinks from 'components/SocialLinks';
import SideMenu from 'components/SideMenu';
import NavigationDrawer from 'components/NavigationDrawer';
// import { imageBuilder } from '../lib/sanity';
import { getAllTagsAndPaintings } from '../lib/api';
import Link from 'next/link';

// const Footer = dynamic(() => import('components/Footer'));
// const PaintingGrid = dynamic(() => import('components/PaintingGrid'));
// const Filters = dynamic(() => import('components/Filters'));

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Home({
  // paintings = [],
  // tags = [],
  // wallpaperPaintings,
  // mobileWallpaper,
  desktopWallpaper,
}) {
  // const [filterTag, setFilterTag] = useState('');
  const [desktopIndex, setDesktopIndex] = useState(0);

  // const [mobileIndex, setMobileIndex] = useState(0);

  // const { width, height } = useWindowDimensions();

  // const paintingsAmount = paintings.length;

  // const myRef = useRef(null);

  // const executeScroll = () =>
  //   myRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //     inline: 'nearest',
  //   });

  const handleGoLeft = () => {
    if (desktopIndex === 0) {
      return setDesktopIndex(desktopWallpaper.length - 1);
    }
    return setDesktopIndex(desktopIndex - 1);
  };

  const handleGoRight = () => {
    if (desktopIndex === desktopWallpaper.length - 1) {
      return setDesktopIndex(0);
    }
    return setDesktopIndex(desktopIndex + 1);
  };

  useEffect(() => {
    setDesktopIndex(parseInt(getRandomArbitrary(0, desktopWallpaper.length)));
  }, [desktopWallpaper.length]);

  const currentWallpaper = desktopWallpaper[desktopIndex];

  const imageProps = useNextSanityImage(
    configuredSanityClient,
    desktopWallpaper[desktopIndex].image,
    {
      blurUpImageWidth: 124,
      blurUpImageQuality: 40,
      blurUpAmount: 24,
    },
  );

  return (
    <>
      <Meta url="https://wisihe.no" />
      <Navigation hideOnDesktop isAbsolute />
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid h-screen grid-cols-12">
          <section className="sticky hidden col-span-2 bg-stone-100 xl:block">
            <SideMenu />
          </section>
          <div className="relative col-span-12 xl:col-span-10">
            <Image
              {...imageProps}
              layout="fill"
              objectFit="cover"
              className="hidden object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover md:block bg-gray-50 "
              alt="headerImage"
            />
            <div className="absolute top-0 bottom-0 flex items-center justify-between text-2xl left-5 right-5">
              <button
                onClick={handleGoLeft}
                className="rounded-lg focus:outline-none focus:ring-2 ring-highlight focus:border-transparent"
              >
                <BsChevronLeft
                  aria-label="Left"
                  className="p-2 text-4xl text-center text-black transition-all bg-white rounded-lg hover:shadow-lg "
                />
              </button>
              <button
                onClick={handleGoRight}
                className="rounded-lg focus:outline-none focus:ring-2 ring-highlight focus:border-transparent"
              >
                <BsChevronRight
                  aria-label="Right"
                  className="p-2 text-4xl text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </button>
            </div>
            <div className="absolute left-0 right-0 flex justify-center bottom-10">
              <Link href="/gallery" passHref>
                <a className="px-4 py-2 text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent">
                  Go to gallery!
                </a>
              </Link>
            </div>
            <div className="absolute justify-center hidden right-5 top-10 xl:flex">
              <div className="p-4 capitalize bg-opacity-50 rounded-lg bg-stone-100">
                {currentWallpaper.title}
              </div>
            </div>
          </div>
        </section>
      </Main>
    </>
  );
}

Home.propTypes = {
  headerImage: PropTypes.any,
  paintings: PropTypes.array,
  tags: PropTypes.array,
  thumbnailImage: PropTypes.any,
  wallpaperPaintings: PropTypes.any,
};

export async function getStaticProps({ preview = false }) {
  const data = await getAllTagsAndPaintings(preview);

  if (data.length < 1) {
    return { props: {} };
  }

  const wallpaperPaintings =
    data.paintings.filter(p => p.tags?.length > 1 && p.tags.find(t => t.value === 'wallpaper')) ||
    [];

  const mobileWallpaper = wallpaperPaintings.filter(w => w.aspectRatio === '9:16') || [];
  const desktopWallpaper = wallpaperPaintings.filter(w => w.aspectRatio === '16:9') || [];

  const flattenedTags = data.tags.filter(tag => tag !== null).flat();
  const tagValues = flattenedTags.map(tag => tag.label);

  const result = {};

  for (let i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0;
    ++result[tagValues[i]];
  }

  const filteredTags = Object.entries(result).filter(w => w[1] > 10);

  return {
    props: {
      paintings: data.paintings,
      wallpaperPaintings,
      mobileWallpaper,
      desktopWallpaper,
      tags: filteredTags,
    },
    revalidate: 600, // 10 min
  };
}
