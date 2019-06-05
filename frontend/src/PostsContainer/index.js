import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Search from 'Search';
import AddPostButton from 'AddPostButton';
import Store from 'Store';
import PostItem from 'PostItem';
import './index.scss';

function PostsContainer(props) {
    const { posts, store } = props;

    // Needed for optimization, when phrase is same as old.
    const [searchPhrase, setSearchPhrase] = useState('');

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
        id => deletePost(posts, store, id),
        [posts, store]
    );

    return (
        <div className="posts-container">
            <div className="posts-container__menu">
                <Search requestHandler={searchCallback} />
                <AddPostButton />
            </div>
            <main className="posts-container__posts">
                {(postsToDisplay.length === 0)
                    ? <h3>No posts</h3>
                    : postsToDisplay.map(post =>
                        <PostItem postData={post} deleteHandler={deleteHandler} key={computeKeyForPost(post)} />
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

function deletePost(posts, store, postId) {
    const filteredPosts = posts.filter(post => post.id !== postId);
    store.set('posts', filteredPosts);
}

function computeKeyForPost(post) {
    // This key generator code is added for case when user edits field of post. Because in such case ID is the same.
    // In production enviromnemt, it would be better to use fast hash function.
    return `${post.id}${post.body}${post.title}${post.userId}`;
}

PostsContainer.propTypes = {
    store: PropTypes.instanceOf(Store).isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
        body: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    })).isRequired,

};

export default PostsContainer;