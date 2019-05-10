import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'Logo';

function Component(props) {
    return (
        <header id="header">
            <Logo imgSrc="https://upload.wikimedia.org/wikipedia/commons/0/03/Cm-logo-200x200.jpg" />
            <h2>{props.title}</h2>
        </header>
    );
}

Component.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
    })),
};

export default Component;