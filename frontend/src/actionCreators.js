import {
    ADD_POST_REQUEST, DELETE_POST_REQUEST, MODIFY_POST_REQUEST, SET_MATCH_PARAMS_REQUEST, SET_POSTS_REQUEST
} from 'actionNames';

function addPostRequest(post) {
    return { type: ADD_POST_REQUEST, post };
}

function deletePostRequest(postId) {
    return { type: DELETE_POST_REQUEST, postId }
}

function modifyPostRequest(post, postId) {
    return { type: MODIFY_POST_REQUEST, post, postId };
}

function setMatchParamsRequest(matchParams) {
    return { type: SET_MATCH_PARAMS_REQUEST, matchParams }
}

function setPostsRequest(posts) {
    return { type: SET_POSTS_REQUEST, posts};
}

export {
    addPostRequest,
    deletePostRequest,
    modifyPostRequest,
    setMatchParamsRequest,
    setPostsRequest,
};