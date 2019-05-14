import React from 'react';
import PropTypes from 'prop-types';

function Component(props) {
    return (
        <img className="logo" src={props.imgSrc} alt="" />
    );
}

Component.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
    })),
};

export default Component;