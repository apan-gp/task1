import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from 'react-router';
import BreadcrumbsView from 'BreadcrumbsView';
import config from 'config';

function BreadcrumbsContainer(props) {
    const { className, matchParams, location, store } = props;

    const parts = useMemo(
        () => {
            return renderParts(config.breadcrumbs, matchParams, location.pathname, store)
        },
        [location.pathname, matchParams]
    );

    return (
        <BreadcrumbsView className={className} parts={parts} />
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
    className: PropTypes.string,
    matchParams: PropTypes.object,
    location: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
};

export default withRouter(BreadcrumbsContainer);