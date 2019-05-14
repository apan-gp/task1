import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Search from 'Search';
import AddPostButton from 'AddPostButton';
import PostItem from 'PostItem';

function PostsContainer(props) {
    // Needed for optimization, when phrase is same as old.
    const [searchPhrase, setSearchPhrase] = useState('');

    const posts = Array.isArray(props.posts) ? props.posts : [];
    const postsToDisplay = filterPosts(posts, searchPhrase);

    const searchCallback = useCallback(
        (newPhrase) => {
            if (searchPhrase === newPhrase) {
                return;
            }

            setSearchPhrase(newPhrase);
        },
        [searchPhrase]);

    return (
        <div className="posts-container">
            <nav className="posts-container__menu">
                <Search requestHandler={searchCallback} />
                <AddPostButton />
            </nav>
            <main className="posts-container__posts">
                {(postsToDisplay.length === 0)
                    ? <h3>No posts</h3>
                    // Mixing title and ID, because have no idea if posts sent by endpoint always have different ID's
                    // (normally it would do it, but current REST endpoint might generate it dynamically, including
                    // ID's).
                    : postsToDisplay.map(val => <PostItem postData={val} key={`${val.title}${val.id}`} />)
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
    posts: PropTypes.arrayOf(PropTypes.shape({
        body: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })),
};

export default PostsContainer;