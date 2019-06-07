import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeletePostButton from 'DeletePostButton';
import './index.scss';

function PostItem(props) {
    const { deleteHandler, postData } = props;

    return (
        <div className="post-item">
            <section>
                <h1 className="post-item__title">{postData.title}</h1>
                <p className="post-item__paragraph">{postData.body}</p>
            </section>
            <div className="post-item__actions">
                <Link to={`/posts/edit/${postData.id}`}>
                    <button className="post-item__button">Open</button>
                </Link>
                <DeletePostButton className="post-item__button" deleteHandler={deleteHandler} postId={postData.id}
                  />
            </div>
        </div>
    );
}

PostItem.propTypes = {
    deleteHandler: PropTypes.func.isRequired,
    postData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
};

export default PostItem;