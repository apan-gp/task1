import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function Logo(props) {
    return (
        <img className="logo" src={props.imgSrc} alt="" />
    );
}

Logo.propTypes = {
    imgSrc: PropTypes.string.isRequired,
};

export default Logo;