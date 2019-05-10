import React from 'react';
import PropTypes from 'prop-types';

function Component(props) {
    return (
        <div className="post-item">
            <section>
                <h1 className="post-item__title">{props.postData.title}</h1>
                <p className="post-item__paragraph">{props.postData.body}</p>
            </section>
            <div className="post-item__actions">
                <button className="post-item__button">Open</button>
                <button className="post-item__button">Delete</button>
            </div>
        </div>
    );
}

Component.propTypes = {
    postData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
    }).isRequired,
};

export default Component;