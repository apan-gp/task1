import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './index.scss';


function BreadcrumbsView(props) {
  return (
    <nav className={classNames(props.className, 'breadcrumbs')}>{createParts(props.parts)}</nav>
  );
}

function createParts(parts) {
  return parts.map((part, idx) => {
    if ('path' in part) {
      return (
        <Link className="breadcrumbs__link" to={part.path} key={idx}>
          {part.text}
        </Link>
      );
    }

    return <span key={idx}>{part.text}</span>;
  });
}

BreadcrumbsView.propTypes = {
  className: PropTypes.string,
  parts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      path: PropTypes.string,
    }),
  ).isRequired,
};

export default BreadcrumbsView;
