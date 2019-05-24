import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbsContainer from 'BreadcrumbsContainer';
import Logo from 'Logo';
import './index.scss';

function Header(props) {
    return (
        <header id="header">
            <Logo imgSrc="https://upload.wikimedia.org/wikipedia/commons/0/03/Cm-logo-200x200.jpg" />
            <h2>{props.title}</h2>
            <BreadcrumbsContainer routes={props.routes} className="header__breadcrumbs" />
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Header;