import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbsContainer from 'BreadcrumbsContainer';
import Logo from 'Logo';
import classNames from 'classnames';
import config from 'config';
import './index.scss';

function Header({ className, matchParams, store, title }) {
    return (
        <header className={classNames('header', className)}>
            <Logo imgSrc={config.logo} />
            <h2>{title}</h2>
            <BreadcrumbsContainer store={store} matchParams={matchParams}
             className="header__breadcrumbs" />
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;