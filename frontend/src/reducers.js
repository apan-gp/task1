import {
    ADD_POST_REQUEST,
    DELETE_POST_REQUEST,
    MODIFY_POST_REQUEST,
    SET_MATCH_PARAMS_REQUEST,
    SET_POSTS_REQUEST,
} from 'actionNames';

function rootReducer(state, action) {
    // There are two main approaches:
    // 1. using "root reducer" and "case function".
    // 2. using "slice reducers" and "combineReducers"
    // This implementation uses 1st approach.
    // Source: redux.js.org/recipes/structuring-reducers/splitting-reducer-logic

    const reducers = [
        addPostReducer,
        deletePostReducer,
        modifyPostReducer,
        setMatchParamsReducer,
        setPostsReducer,
    ];

    const nextState = reducers.reduce(
        (currState, reducer) => reducer(currState, action),
        state
    );
    return nextState;
}

function addPostReducer(state, { type, post }) {
    if (type !== ADD_POST_REQUEST)
    {
        return state;
    }

    const POST_START_ID = 1;

    const nextPostId = state.posts.reduce(
        (prevNextId, currPost) => {
            const nextId = currPost.id + 1;
            return Math.max(prevNextId, nextId);
        },
        POST_START_ID
    );

    const newPost = Object.assign({}, post, { postId: nextPostId });
    newPost['id'] = nextPostId;
    const posts = Object.values(state.posts);
    posts.unshift(newPost);
    return {
        ...state,
        posts,
    };
}

function deletePostReducer(state, { type, postId }) {
    if (type !== DELETE_POST_REQUEST) {
        return state;
    }

    const filteredPosts = state.posts.filter(post => post.id !== postId);
    return {
        ...state,
        posts: filteredPosts,
    };
}

function modifyPostReducer(state, { type, post, postId }) {
    if (type !== MODIFY_POST_REQUEST) {
        return state;
    }

    const currPostIdx = state.posts.findIndex(currPost => currPost.id === postId)
    if (currPostIdx === -1) {
        return {
            ...state,
            errors: [
                ...state.errors,
                'Unable to find post ',
            ],
        };
    }

    const newPosts = Object.values(state.posts);
    newPosts[currPostIdx] = {
        ...post,
        id: postId,
    };
    return {
        ...state,
        posts: newPosts,
    };
}

function setMatchParamsReducer(state, { type, matchParams }) {
    if (type !== SET_MATCH_PARAMS_REQUEST) {
        return state;
    }
    return {
        ...state,
        matchParams,
    }
}

function setPostsReducer(state, { type, posts }) {
    if (type !== SET_POSTS_REQUEST) {
        return state;
    }
    return {
        ...state,
        posts,
    };
}

export default rootReducer;