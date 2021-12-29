import React, { useState } from 'react';
import PropTypes from 'prop-types';

import dynamic from 'next/dynamic';

import Meta from 'components/Meta';
import Main from 'components/Main';

import Navigation from 'components/Navigation';

import SideMenu from 'components/SideMenu';
import NavigationDrawer from 'components/NavigationDrawer';

import { getAllTagsAndPaintings } from '../lib/api';

const PaintingGrid = dynamic(() => import('components/PaintingGrid'));
const Filters = dynamic(() => import('components/Filters'));

export default function Home({ paintings = [], tags = [] }) {
  const [filterTag, setFilterTag] = useState('');

  // const [mobileIndex, setMobileIndex] = useState(0);

  // const { width, height } = useWindowDimensions();

  const paintingsAmount = paintings.length;

  // const myRef = useRef(null);

  // const executeScroll = () => myRef.current.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'start',
  //   inline: 'nearest',
  // });

  // const handleGoLeft = () => {
  //   if (desktopIndex === 0) {
  //     return setDesktopIndex(desktopWallpaper.length - 1);
  //   }
  //   return setDesktopIndex(desktopIndex - 1);
  // };

  // const handleGoRight = () => {
  //   if (desktopIndex === desktopWallpaper.length - 1) {
  //     return setDesktopIndex(0);
  //   }
  //   return setDesktopIndex(desktopIndex + 1);
  // };

  // const imageProps = useNextSanityImage(
  //   configuredSanityClient,
  //   desktopWallpaper[desktopIndex].image,
  //   {
  //     blurUpImageWidth: 124,
  //     blurUpImageQuality: 40,
  //     blurUpAmount: 24,
  //   },
  // );

  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <Navigation hideOnDesktop darkMode />
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12">
          <section className="relative hidden col-span-2 bg-stone-200 xl:block">
            <div className="sticky top-0 w-full h-[fit-content]">
              <SideMenu />
            </div>
          </section>
          <section className="relative col-span-12 xl:col-span-10">
            <div className="p-4 pt-10 xl:items-start bg-stone-100">
              <h1 className="text-4xl">My Gallery</h1>
              <p className="max-w-2xl pt-4">
                My little gallery of digital paintings that I have made over the years. Some of
                these are for sale, if you find one you like, and it&apos;s not for sale, feel free
                to contact me, and I&apos;m sure that I can fix something :)
              </p>
            </div>

            <Filters
              activeFilter={filterTag}
              setFilterTag={setFilterTag}
              paintingsAmount={paintingsAmount}
              filteredTags={tags}
            />
            <PaintingGrid paintings={paintings} filterTag={filterTag} />
          </section>
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
      tags: filteredTags,
    },
    revalidate: 600, // 10 min
  };
}
