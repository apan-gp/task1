import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'Header';
import PostPage from 'PostPage';
import PostsContainer from 'PostsContainer';
import Footer from 'Footer';
import config from 'config';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from 'reducers';
import { setPostsRequest } from 'actionCreators';
import './App.scss';

const initialVals = {
    errors: [],
    posts: [],
    users: config.users,
    matchParams: {},
}

const store = createStore(rootReducer, initialVals,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for debug
);

class App extends React.Component {
    componentDidMount() {
        fetch(`${config.dataEndpoint}posts`)
            .then(response => response.json())
            .then(posts => {
                let nextCommentId = 1;
                const updatedPosts = posts.map((post, postIdx) => {
                    nextCommentId = populateMissingValsOfPost(post, postIdx, nextCommentId);
                    return post;
                });
                store.dispatch(setPostsRequest(updatedPosts));
            });
    }

    render() {
        return (
            <div className="app">
                <Router>
                    <Provider store={store}>
                        <Header title="Logo" className="app__section" />
                        <Switch>
                            <Route exact={true} path='/' render={
                                () => <PostsContainer className="app__section" />
                            } />
                            <Route exact={true} path='/posts/add/' render={
                                () => <PostPage className="app__section" />
                            } />
                            <Route exact={true} path='/posts/edit/:id' render={
                                ({ match }) => <PostPage postId={match.params.id} className="app__section" />
                            } />
                        </Switch>
                        <Footer className='app__section' />
                    </Provider>
                </Router>
            </div>
        );
    }
}

/// @returns next comment ID
function populateMissingValsOfPost(post, postIdx, nextCommentId) {
    post['comments'] = [
        { id: nextCommentId++, title: `Comm. title for ${postIdx}: #0`, body: 'Sample comment body 0' },
        { id: nextCommentId++, title: `Comm. title for ${postIdx}: #1`, body: 'Sample comment body 1' },
    ];
    post['userId'] = postIdx % 3 + 1;
    return nextCommentId;
}

export default App;