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
      <Meta url="https://wisihe.no" />
      <Navigation hideOnDesktop />
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid grid-cols-12">
          <section className="relative hidden col-span-2 bg-stone-200 xl:block">
            <SideMenu />
          </section>
          <div className="relative col-span-12 xl:col-span-10">
            <div className="flex flex-col justify-center p-4 pt-[116px] text-center xl:items-start bg-stone-100">
              <h1 className="text-4xl">My Gallery</h1>
            </div>

            <Filters
              activeFilter={filterTag}
              setFilterTag={setFilterTag}
              paintingsAmount={paintingsAmount}
              filteredTags={tags}
            />
            <PaintingGrid paintings={paintings} filterTag={filterTag} />
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
