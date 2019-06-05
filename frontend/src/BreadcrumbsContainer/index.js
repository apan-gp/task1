import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from 'react-router';
import BreadcrumbsView from 'BreadcrumbsView';

function BreadcrumbsContainer(props) {
    const { matchParams, location, routes, store } = props;

    const parts = useMemo(
        () => {
            return renderParts(routes, matchParams, location.pathname, store)
        },
        [location.pathname, matchParams]
    );

    return (
        <BreadcrumbsView {...props} parts={parts} />
    );
}

function renderParts(routes, matchParams, pathname, store) {
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
        .generateBreadcrumbs(store, matchParams);
    return breadcrumbs;
}

BreadcrumbsContainer.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(BreadcrumbsContainer);