import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import dynamic from 'next/dynamic';

import Meta from 'components/Meta';
import Main from 'components/Main';

import Navigation from 'components/Navigation';

import SideMenu from 'components/SideMenu';
import NavigationDrawer from 'components/NavigationDrawer';

import { getAllTagsAndPaintings } from '../lib/api';
import { AnimatePresence, motion } from 'framer-motion';

import { IoArrowUpSharp } from 'react-icons/io5';
import useScrollPosition from 'hooks/useScrollPosition';
import { useRouter } from 'next/router';

const PaintingGrid = dynamic(() => import('components/PaintingGrid'));
const Filters = dynamic(() => import('components/Filters'));

export default function Home({ paintings = [], tags = [] }) {
  const router = useRouter();
  const { query = {} } = router;
  const { filter = '' } = query;

  const [filterTag, setFilterTag] = useState(filter);

  const paintingsAmount = paintings.length;

  const scrollPosition = useScrollPosition();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!filter) return;
    setFilterTag(filter.toLowerCase());
  }, [filter]);

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
          <section className="relative hidden h-full col-span-2 bg-stone-100 xl:block">
            <div className="sticky  top-0 w-full h-[fit-content]">
              <SideMenu />
            </div>
          </section>
          <section className="relative col-span-12 xl:col-span-10">
            <div className="p-4 pt-10 xl:items-start ">
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
            <AnimatePresence>
              <PaintingGrid paintings={paintings} filterTag={filterTag} />

              {scrollPosition > 400 && (
                <motion.div
                  className="fixed z-10 bottom-8 right-8"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  // transition={{ type: 'spring', stiffness: 100 }}
                  key="backbutton"
                >
                  <button
                    onClick={handleClick}
                    className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg shadow active:bg-highlight focus:outline-none focus:ring focus:ring-highlight"
                  >
                    <IoArrowUpSharp />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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

  // eslint-disable-next-line no-unused-vars
  const sortedPaintings = data.paintings.sort((a, b) => 0.5 - Math.random());

  return {
    props: {
      paintings: sortedPaintings,
      tags: filteredTags,
    },
    revalidate: 3600, // 10 min
  };
}
