import React, { useCallback, useEffect, useState }  from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Comment from 'Comment';
import Modal from 'Modal';
import UsersChooser from 'UsersChooser';
import { addPostToStore, modifyPost, Store } from 'Store';
import './index.scss';

function PostPage({ history, match, postId, posts, store, users }) {
    const [isError, setIsError] = useState(false);
    const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [comments, setComments] = useState([]);

    const closeModal = useCallback(() => setIsError(false), [setIsError]);

    const usersChangeHandler = useCallback(
        event => {
            setUserId(parseInt(event.target.value));
        },
        [setUserId]
    );

    const submitHandler = useCallback(
        () => {
            let post = { title, body, userId, comments };
            if (!isPostInputCorrect(post)) {
                setIsError(true);
                return;
            }

            if (postId) {
                modifyPost(store, post, parseInt(postId));
            }
            else {
                addPostToStore(store, post);
            }

            history.push('/');
        },
        [history, title, body, userId, setIsError, postId, posts, store]
    );

    const titleCallback = useCallback(event => setTitle(event.target.value), [setTitle]);
    const bodyCallback = useCallback(event => setBody(event.target.value), [setBody]);

    useEffect(
        () => {
            store.set('matchParams', match.params);
        },
        []
    );

    useEffect(
        () => {
            if (postId && (0 !== posts.length)) { // Posts can be not obtained yet at the first render.
                const postIdAsNum = parseInt(postId); // postId is from URL. So it is string.
                const post = posts.find(post => post.id === postIdAsNum);
                setTitle(post.title);
                setBody(post.body);
                setUserId(post.userId);
                setComments(post.comments ? post.comments : []);

                // Small error handling:
                if (-1 === users.findIndex(user => user.id === post.userId)) {
                    alert('Using user, which does not exist.');
                }
            }
        },
        [posts] // Posts can be updated later, when REST fetch requests gets data.
    );

    return (
        <div className="add-post-page">
            <h4>Edit/Insert post</h4>
            <input type="text" value={title} onChange={titleCallback} className="add-post-page__title-input"
             placeholder="Title" />
            <textarea value={body} onChange={bodyCallback} className="add-post-page__body-input" placeholder="Body" />
            <UsersChooser changeHandler={usersChangeHandler} users={users} uniqueName="usersOnAddPage"
             defaultValue={parseInt(userId)} />
            <div className="add-post-page__buttons">
                <button type="button" onClick={submitHandler} className="add-post-page__button">Save changes</button>
                <Link to="/">
                    <button type="button" className="add-post-page__button">Cancel</button>
                </Link>
            </div>
            <div>
                {
                    comments.map(comment =>
                        <Comment className="add-post-page__comment" title={comment.title} body={comment.body}
                         key={computeCommentKey(comment.title, comment.body)} />)
                }
            </div>
            {isError
                ? <Modal>
                    <p>Please correct fields</p>
                    <button onClick={closeModal} className="add-post-page__button">Close</button>
                  </Modal>
                : null
            }
        </div>
    );
}

function isPostInputCorrect(post) {
    return post['body'] && post['title'] && post['userId'];
}

function computeCommentKey(title, body) {
    return `${title}${body}`;
}

PostPage.propTypes = {
    postId: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.shape({
        body: PropTypes.string.isRequired,
        comments: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
        })),
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
    })).isRequired,
    store: PropTypes.instanceOf(Store).isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
};

export default withRouter(PostPage);