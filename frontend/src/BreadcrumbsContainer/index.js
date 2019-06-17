import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from 'react-router';

import BreadcrumbsView from 'BreadcrumbsView';
import config from 'config';


function BreadcrumbsContainer({ className, matchParams, location, store }) {
  const parts = useMemo(
    () => {
      return renderParts(config.breadcrumbs, matchParams, location.pathname, store)
    },
    [location.pathname, matchParams]
  );

  return (
    <BreadcrumbsView className={className} parts={parts}/>
  );
}

function renderParts(routes, matchParams, pathname, store) {
  const matchingSettings = {
    exact: true,
    strict: false,
  };

  return routes
    .find(
      routeData => {
        matchingSettings['path'] = routeData.path;
        return matchPath(pathname, matchingSettings);
      })
    .generateBreadcrumbs(store, matchParams);
}

BreadcrumbsContainer.propTypes = {
  className: PropTypes.string,
  matchParams: PropTypes.object,
  location: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withRouter(BreadcrumbsContainer);
