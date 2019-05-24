import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.scss';

function BreadcrumbsView(props) {
    return (
        <><nav className={`${props.className} breadcrumbs`}>{createParts(props.parts)}</nav></>
    );
}

function createParts(parts) {
    return parts.map(part => {
        return (
            <Link className="breadcrumbs__link" to={part.path} key={`${part.path}${part.text}`}>
                {part.text}
            </Link>);
    });
}

BreadcrumbsView.propTypes = {
    parts: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default BreadcrumbsView;