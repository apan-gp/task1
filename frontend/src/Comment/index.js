import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

function Comment(props) {
    return (
        <div className={classNames(props.className, 'comment')}>
            <h4>{props.title}</h4>
            <p>{props.body}</p>
        </div>
    );
}

Comment.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};

export default Comment;