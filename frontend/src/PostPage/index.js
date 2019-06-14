import React, { useCallback, useEffect, useState }  from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Comment from 'Comment';
import Modal from 'Modal';
import UsersChooser from 'UsersChooser';
import { useDispatch, useSelector } from 'react-redux';
import { addPostRequest, modifyPostRequest, setMatchParamsRequest } from 'actionCreators';
import classNames from 'classnames';
import './index.scss';

function PostPage({ className, history, match, postId }) {
    const [isError, setIsError] = useState(false);
    const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [comments, setComments] = useState([]);

    const posts = useSelector(state => state.posts);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const closeModal = useCallback(() => setIsError(false), [setIsError]);

    const usersChangeHandler = useCallback(
        event => {
            setUserId(parseInt(event.target.value));
        },
        [setUserId]
    );

    const submitHandler = useCallback(
        () => {
            const post = { title, body, userId, comments };
            if (!isPostInputCorrect(post)) {
                setIsError(true);
                return;
            }

            const actionToDispatch = (postId ? modifyPostRequest(post, parseInt(postId)) : addPostRequest(post));

            dispatch(actionToDispatch);

            history.push('/');
        },
        [history, title, body, userId, setIsError, postId, posts]
    );

    const titleCallback = useCallback(event => setTitle(event.target.value), [setTitle]);
    const bodyCallback = useCallback(event => setBody(event.target.value), [setBody]);

    useEffect(
        () => dispatch(setMatchParamsRequest(match.params)),
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
        <div className={classNames('post-page', className)}>
            <h4>Edit/Insert post</h4>
            <input type="text" value={title} onChange={titleCallback} className="post-page__part post-page__title-input"
             placeholder="Title" />
            <textarea value={body} onChange={bodyCallback} className="post-page__part post-page__body-input"
             placeholder="Body" />
            <UsersChooser changeHandler={usersChangeHandler} users={users} formName="usersOnAddPage"
             defaultValue={parseInt(userId)} className="post-page__part" />
            <div className="post-page__part post-page__buttons">
                <button type="button" onClick={submitHandler} className="post-page__button">Save changes</button>
                <Link to="/">
                    <button type="button" className="post-page__button">Cancel</button>
                </Link>
            </div>
            <div className="post-page__part">
                {
                    comments.map(comment =>
                        <Comment className="post-page__comment" title={comment.title} body={comment.body}
                         key={comment.id} />)
                }
            </div>
            {isError
                ? <Modal>
                    <p>Please correct fields</p>
                    <button onClick={closeModal} className="post-page__button">Close</button>
                  </Modal>
                : null
            }
        </div>
    );
}

function isPostInputCorrect(post) {
    return post['body'] && post['title'] && post['userId'];
}

PostPage.propTypes = {
    className: PropTypes.string,
    postId: PropTypes.string,
};

export default withRouter(PostPage);