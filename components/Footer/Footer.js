import PropTypes from 'prop-types';
import clsx from 'clsx';
import React from 'react';
import SocialLinks from '../SocialLinks/SocialLinks';
import { motion } from 'framer-motion';

export default function Footer({ fixed = false, onlyMobile = false }) {
  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{
        stiffness: 200,
        delay: 0.5,
        bounce: 0.25,
      }}
      className={clsx(
        'w-full p-4 text-white bg-primary ',
        fixed && 'fixed bottom-0',
        onlyMobile && ' block lg:hidden',
      )}
    >
      <SocialLinks />
    </motion.footer>
  );
}

Footer.propTypes = {
  fixed: PropTypes.bool,
  onlyMobile: PropTypes.bool,
};
