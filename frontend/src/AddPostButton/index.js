import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
    return (
        <Link to="/posts/edit/">
            <button className="add-post-button">
                Add post
            </button>
        </Link>
    );
};