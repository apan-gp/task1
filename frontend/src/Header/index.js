import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbsContainer from 'BreadcrumbsContainer';
import Logo from 'Logo';
import classNames from 'classnames';
import config from 'config';
import './index.scss';

function Header({ className, title }) {
    return (
        <header className={classNames('header', className)}>
            <Logo imgSrc={config.logo} />
            <h2>{title}</h2>
            <BreadcrumbsContainer className="header__breadcrumbs" />
        </header>
    );
}

Header.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default Header;