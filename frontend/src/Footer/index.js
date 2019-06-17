import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';


function Footer({ className }) {
  return (
    <footer className={classNames('footer', className)}>
      Copyright 2017
    </footer>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
