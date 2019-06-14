import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from 'react-router';
import BreadcrumbsView from 'BreadcrumbsView';
import { useSelector } from 'react-redux';
import config from 'config';

function BreadcrumbsContainer(props) {
    const { className, location } = props;

    const matchParams = useSelector(state => state.matchParams);

    const routeData = useMemo(
        () => getCurrRouteData(config.breadcrumbs, location.pathname),
        [config.breadcrumbs, location.pathname]
    );
    const breadcrumbsData = useSelector(routeData.dataSelector || (() => null));

    const parts = useMemo(
        () => {
            return renderParts(routeData, matchParams, breadcrumbsData)
        },
        [breadcrumbsData, matchParams, routeData]
    );

    return (
        <BreadcrumbsView className={className} parts={parts} />
    );
}

function getCurrRouteData(breadcrumbsConfig, pathname) {
    const matchingSettings = {
        exact: true, // To not make '/' and '/posts/' equal.
        strict: false,
    };
    return breadcrumbsConfig.find(
        routeData => {
            matchingSettings['path'] = routeData.path;
            const matchingResult = matchPath(pathname, matchingSettings);
            return !!matchingResult;
        }
    );
}

function renderParts(routeData, matchParams, breadcrumbsData) {
    return routeData.generateBreadcrumbs(breadcrumbsData, matchParams);
}

BreadcrumbsContainer.propTypes = {
    className: PropTypes.string,
    location: PropTypes.object.isRequired,
};

export default withRouter(BreadcrumbsContainer);