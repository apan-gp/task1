import React from 'react';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from 'react-router';
import BreadcrumbsView from 'BreadcrumbsView';

function BreadcrumbsContainer(props) {
    const { match, location, routes } = props;

    return (
        <BreadcrumbsView {...props} parts={generateParts(routes, match, location.pathname)} />
    );
}

function generateParts(routes, match, pathname) {
    const matchingSettings = {
        exact: true, // To not make '/' and '/posts/' equal.
        strict: false,
    };
    const breadcrumbs = routes
        .find(
            routeData => {
                matchingSettings['path'] = routeData.path;
                const matchingResult = matchPath(pathname, matchingSettings);
                return !!matchingResult;
            })
        .breadcrumbs;
    return breadcrumbs;
}

BreadcrumbsContainer.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(BreadcrumbsContainer);