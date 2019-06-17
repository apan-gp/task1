import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';


export default props => {
  return (
    <Link to="/posts/add/">
      <button className="add-post-button">
        Add post
      </button>
    </Link>
  );
};
