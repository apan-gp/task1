// Getting (way "from store") is done on save, by callback, and passed to components via props. It is to use existing
// React's technology to make page auto-update.
class Store {
    constructor() {
        this.saveCallback = null;
    }

    /// @param path string
    get(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    /// @param path string
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
        if (this.saveCallback !== null) {
            this.saveCallback(key, value);
        }
    }

    /// @param callback function: undefined(string path, any value)
    setSaveCallback(callback) {
        this.saveCallback = callback;
    }
}

function addPostToStore(store, post) {
    const POST_START_ID = 1;

    const prevPosts = store.get('posts');
    const postNextId = prevPosts.reduce((prevNextId, currPost) => {
            let nextId = currPost.id + 1;
            return Math.max(prevNextId, nextId);
        },
        POST_START_ID
    );
    post['id'] = postNextId;

    const postsToSave = Array.from(prevPosts);
    postsToSave.unshift(post);
    store.set('posts', postsToSave);
}

/// @param postId number
function modifyPost(store, postData, postId) {
    const posts = Array.from(store.get('posts'));
    postData['id'] = postId;
    const postIdx = posts.findIndex(post => post.id === postId);
    posts[postIdx] = postData;
    store.set('posts', posts);
}

export { addPostToStore, modifyPost, Store };
export default Store;