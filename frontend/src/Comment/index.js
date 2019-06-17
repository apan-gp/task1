import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';


function Comment({ className, title, body }) {
  return (
    <div className={classNames(className, 'comment')}>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
}

Comment.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default Comment;
