import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


function Logo({ imgSrc }) {
  return (
    <img className="logo" src={imgSrc} alt=""/>
  );
}

Logo.propTypes = {
  imgSrc: PropTypes.string.isRequired,
};

export default Logo;
