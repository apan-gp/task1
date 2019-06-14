import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Search from 'Search';
import AddPostButton from 'AddPostButton';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostRequest } from 'actionCreators';
import PostItem from 'PostItem';
import classNames from 'classnames';
import './index.scss';

function PostsContainer(props) {
    const { className } = props;

    // Needed for optimization, when phrase is same as old.
    const [searchPhrase, setSearchPhrase] = useState('');

    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();

    const postsToDisplay = useMemo(
        () => filterPosts(posts, searchPhrase),
        [posts, searchPhrase]
    );

    const searchCallback = useCallback(
        (newPhrase) => {
            if (searchPhrase === newPhrase) {
                return;
            }

            setSearchPhrase(newPhrase);
        },
        [searchPhrase]
    );

    const deleteHandler = useCallback(
        id => dispatch(deletePostRequest(id)),
        []
    );

    return (
        <div className="posts-container">
            <div className="posts-container__menu">
                <Search requestHandler={searchCallback} />
                <AddPostButton />
            </div>
            <main className={classNames('posts-container__posts', className)}>
                {(postsToDisplay.length === 0)
                    ? <h3>No posts</h3>
                    : postsToDisplay.map(post =>
                        <PostItem postData={post} deleteHandler={deleteHandler} key={post.id} />
                    )
                }
            </main>
        </div>
    );
}

function filterPosts(posts, phrase) {
    if (!phrase) {
        return posts;
    }
    return posts.filter(elem => elem.title.includes(phrase) || elem.body.includes(phrase));
}

PostsContainer.propTypes = {
};

export default PostsContainer;